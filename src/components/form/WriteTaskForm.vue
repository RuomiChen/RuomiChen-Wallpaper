<script setup lang="ts">
import Form from '@primevue/forms/form';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Button, InputText, Message } from 'primevue';
import Editor from 'primevue/editor';
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';
import { z } from 'zod';

const toast = useToast();
const initialValues = ref({
    title: '',
    content: ''
});

const resolver = ref(zodResolver(
    z.object({
        title: z.string().min(1, { message: 'Title is required.' }),
        content: z.string().min(1, { message: 'Content is required.' })
    })
));

const onFormSubmit = ({ valid }: { valid: any }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};

</script>

<template>
    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
        class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
            <InputText name="title" type="text" placeholder="Title" />
            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                $form.username.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
            <Editor name="content" editorStyle="height: 320px" />
            <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{
                $form.content.error?.message }}</Message>
        </div>
        <Button type="submit" severity="secondary" label="Submit" />
    </Form>
</template>
