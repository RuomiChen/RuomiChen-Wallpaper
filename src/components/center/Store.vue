<script setup lang="ts">
defineProps<{
    data: StoreItem[]
}>();
import { Divider, useConfirm } from 'primevue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { onMounted, ref } from 'vue';
import DefaultImg from '../../../public/logo.svg';
import { useGlobalState } from '../../store/user';
import { AppDialog } from '../../utils/dialog';
import { useMyFetch } from '../../utils/request';
import { AppToast } from '../../utils/toast';
import RedeemDialog from '../dialog/RedeemDialog.vue';

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

const redeemHistory = ref([])
const canRedeem = (item: StoreItem): boolean => {
    return user.value.points >= item.point && item.stock > 0
}

const redeemItem = (item: StoreItem) => {
    confirmRedeem(item)
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
            const { data, error } = await useMyFetch('/api/store/redeem').post({ id: item._id }).json()
            if (error.value) {
                await userState.refreshUserInfo();
                return;
            }

            if (data.value) {
                user.value.points = data.value.points;
                item.stock = data.value.stock;
                AppToast.success('Redeem success');
            }
        },
        reject: () => {
        }
    });
};
const openRecord = () => {
    AppDialog.open(RedeemDialog, {
        header: 'Redeem Record',
        style: {
            width: '50vw',
        },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
        data: redeemHistory, // ✅ 直接传 base64
        emits: {
            onSuccess: async (e) => {
            }
        }
    })
}
const getRedeemRecord = async () => {
    const { data, error } = await useMyFetch('/api/store/redeem_record').json()
    if (!error.value) {
        redeemHistory.value = data.value
    }
}
onMounted(() => {
    userState.refreshUserInfo()
    getRedeemRecord()
})
</script>
<template>
    <div class="min-h-screen bg-background">
        <div>
            <div class="container mx-auto p-4 ">
                <div class="flex items-center justify-end gap-4">
                    <div class=" flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full">
                        <i class="pi pi-star-fill text-primary text-xl"></i>
                        <div>
                            <p class="text-2xl font-bold text-foreground">{{ user?.points }}</p>
                        </div>
                    </div>
                    <!-- 兑换记录按钮 -->
                    <Button icon="pi pi-clock" class="" label="Redeem Record" rounded outlined @click="openRecord" />
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


    </div>
</template>


<style scoped></style>