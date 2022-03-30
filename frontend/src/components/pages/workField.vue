<template>
  <v-app id="workField">
<!-- 工事一覧 -->
    <v-container>
      <h2>工事一覧</h2>
      <v-sheet color="white" rounded outlined>
        <v-row align="center" >
          <v-col cols="12" sm="4" md="2"></v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="2">
            <!-- 工事を追加するボタン -->
            <v-btn @click="showEditWorkField()" outlined elevation="3">
              工事を追加
              <v-icon color="#ff6669">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" >
          <v-col cols="12" sm="4" md="2"></v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
        </v-row>
        <v-row align="center" >
          <!-- data teble-->
          <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
          <v-data-table
            :headers="workFieldHeader"
            :items="getWorkField"
            :search="searchWorkField"
            :custom-filter="searchWorkField"
            :items-per-page="-1"
            item-key="name"
            class="elevation-1 table"
            rowsPerPage: All
            height= '300'
            @click:row="showEditWorkField"
          >
            <template v-slot:top>
              <v-row >
                <v-col cols='4'>
                  <!-- 検索窓 -->
                  <v-text-field
                    v-model="search"
                    label="検索"
                    class="expanding-search mt-1"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="6"></v-col>
                <v-col cols="2">
                  <!-- 協力会社を追加するボタン -->
                  <v-checkbox label="未進行を含める" color="#ff6669">
                  </v-checkbox>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`body.append`]> </template>
            <!-- 削除ボタン -->
            <template v-slot:[`item.delete`]="{ item }">
              <v-btn @click.stop="onClickDelete(item)" color="#00ffd0" elevation="3" outlined fab height="2.5rem" width="2.5rem">
                <v-icon large>mdi-delete-empty</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-row>
      </v-sheet>
<!-- 工事編集ダイアログ -->
      <v-dialog
      v-model="workFieldDialog"
      persistent
      max-width="480"
    >
      <v-card>
        <v-card-title class="text-h6 grey lighten-2">
          工事編集
        </v-card-title>

        <v-card-text>
            <v-row>
              <v-col cols="3">
                <div class="item-title">JobNo.</div>
              </v-col>
              <v-col cols="2">
                <div class="item-required">
                  <v-chip color="red" dark>必須</v-chip></div>
              </v-col>
              <v-col>
                <v-text-field v-model="JobName" :rules="JobRules"  label="(例)21-0001" maxlength='7' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="item-title">客先名</div>
              </v-col>
              <v-col cols="2">
                <div class="item-required">
                  <v-chip color="red" dark>必須</v-chip></div>
              </v-col>
              <v-col>
                <v-select label="(例)株式会社ABC" :items="['株式会社A', '株式会社B', '株式会社C', '株式会社D']" outlined required></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="item-title">現場名</div>
              </v-col>
              <v-col cols="2">
                <div class="item-required">
                  <v-chip color="red" dark>必須</v-chip></div>
              </v-col>
              <v-col>
                <v-select label="(例)現場名A" :items="['現場名A', '現場名B', '現場名C', '現場名D']" outlined required></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="item-title">工事件名</div>
              </v-col>
              <v-col cols="2">
                <div class="item-required">
                  <v-chip color="red" dark>必須</v-chip></div>
              </v-col>
              <v-col>
                <v-text-field v-model="constructionName" :rules="constructionRules" label="(例)工事件名１－ABC" maxlength='100' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="item-title">ステータス</div>
              </v-col>
              <v-col cols="2">
                <div class="item-required">
                  <v-chip color="red" dark>必須</v-chip></div>
              </v-col>
              <v-col>
                <v-radio-group v-model="row" row mandatory>
                  <v-radio label="進行中" value="radio-1" color="#ff6669"></v-radio>
                  <v-radio label="完了済" value="radio-2" color="#ff6669"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="item-title">契約形態</div>
              </v-col>
              <v-col cols="2">
                <div class="item-required">
                  <v-chip color="red" dark>必須</v-chip></div>
              </v-col>
              <v-col>
                <v-radio-group v-model="row" row mandatory>
                  <v-radio label="常用" value="radio-1" color="#ff6669"></v-radio>
                  <v-radio label="請負" value="radio-2" color="#ff6669"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#ff6669" class="white--text" rounded @click="saveWorkFieldInfo()">
            OK
          </v-btn>
          <v-btn @click="closeWorkFieldDialog()" class="#f5f5f5" rounded>
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    workFieldDialog: false,
    JobName: '',
    JobRules: [
      v => !!v || 'JobNoが未入力です',
      v => (!!v && v.length <= 7) || `7文字以内で入力してください`,
      v => /^[A-Za-z0-9-]*$/.test(v) || '入力は半角数字・ハイフンのみです'
    ],
    constructionName: '',
    constructionRules: [
      v => !!v || '工事件名が未入力です',
      v => (!!v && v.length <= 100) || `100文字以内で入力してください`
    ]
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    workFieldHeader () {
      return [
        {
          text: 'JobNo',
          value: 'jobNo',
          align: 'center',
          width: '18%'
        },
        {
          text: '客先',
          value: 'conmpanyName',
          align: 'center',
          width: '18%'
        },
        {
          text: '現場名',
          value: 'workFieldName',
          align: 'center',
          width: '18%'
        },
        {
          text: '工事件名',
          value: 'workName',
          align: 'center',
          width: '18%'
        },
        {
          text: 'ステータス',
          value: 'status',
          align: 'center',
          width: '18%'
        },
        { text: '削除',
          sortable: false,
          value: 'delete',
          align: 'center',
          width: '10%'
        }
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getWorkField () {
      /** ToDo */
      /** Vuex workFieldListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.workFieldList.workFieldList
    }
  },
  methods: {
    // 現場編集 ダイアログ表示処理
    showEditWorkField (item) {
      this.editItem = item
      this.workFieldDialog = true
    },
    // 現場編集 ダイアログ閉じる処理
    closeWorkFieldDialog () {
      this.editItem = []
      this.workFieldDialog = false
    },
    // 現場編集 保存処理
    saveWorkFieldInfo (item) {
      // TODO 保存処理
      this.workFieldDialog = false
    },
    // 削除ボタン押下処理
    onClickDelete (item) {
      alert('削除')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  font-size: 3.8rem;
  height: 75px;
  padding-top: 5px;
  background-color: #cccccc;
}
.item-title {
  padding-top: 20px;
}
.item-required {
  padding-top: 15px;
}
.table {
  width: 100%;
}
.table-display {
  margin-bottom: 10px;
}
</style>
