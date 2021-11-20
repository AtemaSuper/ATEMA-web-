<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          工事編集ボタン
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" lg="12" sm="12">
            <span class="text-h4">工事編集</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row align="center">
              <v-col cols="12" class="text-h5" lg="4" sm="4">
                <p>JobNo.</p>
              </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="JobName" :rules="JobRules" label="(例)21-0001" outlined required></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" class="text-h5" lg="4" sm="4">
                  <p>客先名</p>
              </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select outlined label="(例)株式会社ABC" :items="['株式会社A', '株式会社B', '株式会社C', '株式会社D']" required></v-select>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" class="text-h5" lg="4" sm="4">
                  <p>現場名</p>
              </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select outlined label="(例)現場名A" :items="['現場名A', '現場名B', '現場名C', '現場名D']" required></v-select>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" class="text-h5" lg="4" sm="4">
                  <p>工事件名</p>
              </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="constructionName" :rules="constructionRules" label="(例)工事件名１－ABC" outlined required></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" lg="4" sm="4">
                <p class="text-h5">ステータス</p>
              </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
              <v-col>
                <v-radio-group v-model="row" row mandatory>
                  <v-radio label="進行中" value="radio-1"></v-radio>
                  <v-radio label="完了済" value="radio-2"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" lg="4" sm="4">
                <p class="text-h5">契約形態</p>
              </v-col>
              <v-col cols="12" class="red--text" lg="2" sm="2">
                <p>※必須</p>
              </v-col>
              <v-col>
                <v-radio-group v-model="row" row mandatory>
                  <v-radio label="常用" value="radio-1"></v-radio>
                  <v-radio label="請負" value="radio-2"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog = false"
          >
            確定
          </v-btn>
          <v-btn
            color="white"
            @click="dialog = false"
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
    JobName: '',
    JobRules: [
      v => !!v || 'JobNo.が未入力です。'
    ],
    constructionName: '',
    constructionRules: [
      v => !!v || '工事件名が未入力です。'
    ]
  }),
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
