<script setup lang="ts">
defineProps<{
    data: StoreItem[]
}>();
import { Divider, useConfirm } from 'primevue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';
import DefaultImg from '../../../public/logo.svg';
import { useGlobalState } from '../../store/user';
import { useMyFetch } from '../../utils/request';
import { AppToast } from '../../utils/toast';

interface StoreItem {
    _id: string
    name: string
    image?: string
    stock: number
    point: number
    desc?: string
}
const userState = useGlobalState()
const user = userState.userInfo

const userPoints = ref(250)
const showSuccessDialog = ref(false)
const showErrorDialog = ref(false)
const redeemedItem = ref<StoreItem | null>(null)
const requiredPoints = ref(0)

const canRedeem = (item: StoreItem): boolean => {
    return userPoints.value >= item.point && item.stock > 0
}

const redeemItem = (item: StoreItem) => {
    if (!canRedeem(item)) {
        requiredPoints.value = item.point - userPoints.value
        showErrorDialog.value = true
        return
    }
    confirmRedeem(item)
    // AppDialog.open()


    // // Deduct points
    // userPoints.value -= item.point

    // // Reduce stock
    // item.stock -= 1

    // // Show success dialog
    // redeemedItem.value = item
    // showSuccessDialog.value = true

    // console.log('[v0] Item redeemed:', item.name, 'Remaining points:', userPoints.value)
}
const confirm = useConfirm();
const confirmRedeem = (item: StoreItem) => {
    confirm.require({
        message: 'Are you sure you want to redeem?',
        header: 'Redeem',
        icon: 'pi pi-star-fill text-primary',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Redeem'
        },
        accept: async () => {
            // 扣分
            user.value.points -= item.point
            item.stock--
            const { data,error } = await useMyFetch('/api/store/redee').post({id:item._id}).json()
            if(!error.value){
                AppToast.success('Redeem success')
            }
        },
        reject: () => {
        }
    });
};
</script>
<template>
    <div class="min-h-screen bg-background">
        <div>
            <div class="container mx-auto px-4 py-6">
                <div class="flex items-center justify-end">
                    <div class=" flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full">
                        <i class="pi pi-star-fill text-primary text-xl"></i>
                        <div>
                            <p class="text-xs text-muted-foreground">Your Points</p>
                            <p class="text-2xl font-bold text-foreground">{{ user.points }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Divider />

        <main class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card v-for="item in data" :key="item._id" class="overflow-hidden hover:shadow-lg transition-shadow">
                    Item Image
                    <template #header>
                        <div class="relative h-48 bg-muted overflow-hidden">
                            <img :src="item.image || DefaultImg" :alt="item.name" class="w-full h-full object-cover" />
                            <div v-if="item.stock < 50"
                                class="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
                                Low Stock
                            </div>
                        </div>
                    </template>

                    <template #content>
                        <div class="space-y-3">
                            <div>
                                <h3 class="text-xl font-bold text-foreground mb-1">{{ item.name }}</h3>
                                <p class="text-sm text-muted-foreground leading-relaxed">{{ item.desc }}</p>
                            </div>

                            <div class="flex items-center justify-between pt-2">
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-star-fill text-primary"></i>
                                    <span class="text-2xl font-bold text-foreground">{{ item.point }}</span>
                                    <span class="text-sm text-muted-foreground">points</span>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-muted-foreground">Stock</p>
                                    <p class="text-sm font-semibold text-foreground">{{ item.stock }}</p>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #footer>
                        <Button :label="canRedeem(item) ? 'Redeem Now' : 'Insufficient Points'"
                            :disabled="!canRedeem(item) || item.stock === 0"
                            :severity="canRedeem(item) && item.stock > 0 ? 'primary' : 'secondary'" class="w-full"
                            @click="redeemItem(item)">
                            <template #icon>
                                <i class="pi pi-shopping-cart mr-2"></i>
                            </template>
                        </Button>
                    </template>
                </Card>
            </div>
        </main>

        <Dialog v-model:visible="showSuccessDialog" modal header="Redemption Successful!" :style="{ width: '450px' }">
            <div class="flex flex-col items-center gap-4 py-4">
                <i class="pi pi-check-circle text-6xl text-green-500"></i>
                <p class="text-center text-lg">
                    You've successfully redeemed <strong>{{ redeemedItem?.name }}</strong> for
                    <strong>{{ redeemedItem?.point }} points</strong>!
                </p>
                <p class="text-muted-foreground text-sm">
                    Remaining points: <strong>{{ userPoints }}</strong>
                </p>
            </div>
            <template #footer>
                <Button label="Continue Shopping" @click="showSuccessDialog = false" class="w-full" />
            </template>
        </Dialog>

        <Dialog v-model:visible="showErrorDialog" modal header="Insufficient Points" :style="{ width: '450px' }">
            <div class="flex flex-col items-center gap-4 py-4">
                <i class="pi pi-times-circle text-6xl text-red-500"></i>
                <p class="text-center text-lg">
                    You need <strong>{{ requiredPoints }}</strong> more points to redeem this item.
                </p>
            </div>
            <template #footer>
                <Button label="Got It" @click="showErrorDialog = false" class="w-full" severity="secondary" />
            </template>
        </Dialog>
    </div>
</template>


<style scoped></style>