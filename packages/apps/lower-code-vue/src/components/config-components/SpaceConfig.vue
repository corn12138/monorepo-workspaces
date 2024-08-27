<template>
    <div>
        <div class="config-title">留白配置</div>
        <div class="config-content">
            <div class="config-content-item fl fl_jc_sb fl_ai_c">
                <span class="config-content-item-label">留白高度：</span>
                <span>
                    <NumberInput :default-value="dataType.settings.style.height"
                        @change="val => changeValue(['style', 'height'], val)" />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import './index.css'
import { ref } from 'vue';
import NumberInput from '@lc/number-input/index.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {}
        }
    },
    change: {
        type: Function,
        default: () => { }
    }
});
const changeValue = (key, value) => {
    props.change(key, value);
};

</script>

<style></style>