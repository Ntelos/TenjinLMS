<template>
  <Transition name="modalinfo">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close')" >{{ $t("home.Back") }}</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
    const props = defineProps({ show: Boolean })
</script>