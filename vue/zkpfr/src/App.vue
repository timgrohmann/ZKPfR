<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <ChatBubble
          v-for="message in chats"
          v-bind:key="message.msg + message.own + message.timestamp"
          :message="message.msg"
          :own="message.own"
          :timestamp="message.timestamp"
        />
        <v-text-field v-model="message" @keyup.enter="didSend" />
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import ChatBubble from "./components/ChatBubble";

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    message: "",
    chats: []
  }),
  components: {
    ChatBubble: ChatBubble
  },
  methods: {
    didSend() {
      console.log(this.message);
      this.chats.push({
        msg: this.message,
        own: true,
        timestamp: new Date()
      });
      this.$socket.emit("sendMsg", this.message);
    }
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    stcMsg: function(data) {
      console.log(`Recieved ${data}`);
      this.chats.push({
        msg: data,
        own: false,
        timestamp: new Date()
      });
    },
    newUser: function(data) {
      console.log(`New User with ID ${data} joined the chat`);
    }
  }
};
</script>