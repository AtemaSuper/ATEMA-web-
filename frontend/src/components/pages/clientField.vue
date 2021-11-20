<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          客先追加ボタン
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" lg="12" sm="12">
              <span class="text-h4">客先追加</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" sm="4" md="4">
              <p class="text-h5">客先名</p>
            </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                outlined
                label="(例)株式会社ABC"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" sm="6">
              <p class="text-h5">ステータス</p>
            </v-col>
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
          <v-btn color="primary" @click="dialog = false">
            確定
          </v-btn>
          <v-btn color="white" @click="dialog = false">
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="adialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          現場編集ボタン
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" lg="12" sm="12">
            <span class="text-h4">現場編集</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
            <v-row align="center">
              <v-col cols="12" sm="6">
                <p class="text-h5">客先名</p>
              </v-col>
                <v-col cols="12" sm="6">
                <v-select
                  :items="['株式会社A', '株式会社B', '株式会社C', '株式会社D']"
                  outlined
                  label="客先名を選択してください"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="4" md="4">
                <p class="text-h5">現場名</p>
              </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="fieldname" :rules="fieldRules" outlined label="現場名を入力してください" required></v-text-field>
              </v-col>
            </v-row>
          <v-row align="center">
            <v-col cols="12" sm="6">
              <p class="text-h5">ステータス</p>
            </v-col>
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
          <v-btn
            color="primary"
            @click="adialog = false"
          >
            確定
          </v-btn>
          <v-btn
            color="white"
            @click="adialog = false"
          >
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
    adialog: false,
    valid: false,
    firstname: '',
    nameRules: [
      v => !!v || '会社名が未入力です。'
    ],
    fieldname: '',
    fieldRules: [
      v => !!v || '現場名が未入力です。'
    ]
  }),
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
