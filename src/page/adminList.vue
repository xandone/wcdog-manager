<template>
    <div>
        <headTop></headTop>
        <no-permission />
    </div>
</template>
<script>
import headTop from '@/components/HeadTop.vue'
import NoPermission from '@/components/NoPermission.vue'

export default {
    components: {
        headTop,
        'no-permission': NoPermission
    }

}
</script>