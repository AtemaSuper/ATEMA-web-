<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" lg="12" sm="12">
              <span class="text-h5">客先追加</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" sm="6" md="6">
              客先名
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="(例)株式会社ABC"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" sm="6">ステータス </v-col>
            <v-col>
              <v-radio-group v-model="row" row mandatory>
                <v-radio label="進行中" value="radio-1"></v-radio>
                <v-radio label="未進行" value="radio-2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            確定
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  components: {
  },
  conputed: {
  },
  data: () => ({
    dialog: false,
    valid: false,
    firstname: '',
    nameRules: [
      v => !!v || '会社名が未入力です。'
    ]
  }),
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
