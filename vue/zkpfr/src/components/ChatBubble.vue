<template>
  <v-container>
    <v-row :justify="own ? 'end' : 'start'">
      <v-card :color="own ? 'white': '#FA9090'" class="pa-2">{{message}}</v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChatBubble",
  props: {
    message: String,
    own: Boolean,
    timestamp: Date
  },
  data: () => ({})
};
</script>
