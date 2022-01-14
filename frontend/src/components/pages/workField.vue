<template>
  <v-app id="workField">
<!-- 工事一覧 -->
  <v-card>
    <v-container>
      <v-sheet color="white table-display" rounded outlined>
        <v-row align="center" >
          <v-col cols="12" sm="4" md="2"></v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="2">
            <!-- 工事を追加するボタン -->
            <v-btn
            outlined
            @click="showEditWorkField()"
            >工事を追加<v-icon >mdi-plus</v-icon></v-btn>
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
                  <v-checkbox label="未進行を含める">
                  </v-checkbox>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`body.append`]> </template>
            <!-- 削除ボタン -->
            <template v-slot:[`item.delete`]="{ item }">
              <v-btn @click.stop="onClickDelete(item)">
                <v-icon color="green darken-2">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-row>
      </v-sheet>
      <v-dialog
      v-model="workFieldDialog"
      persistent
      max-width="600px"
    >
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
            @click="saveWorkFieldInfo()"
          >
            確定
          </v-btn>
          <v-btn
            color="white"
            @click="closeWorkFieldDialog()"
          >
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </v-card>
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
      v => !!v || 'JobNo.が未入力です。'
    ],
    constructionName: '',
    constructionRules: [
      v => !!v || '工事件名が未入力です。'
    ]
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    workFieldHeader () {
      return [
        {
          text: 'JobNo',
          align: 'center',
          value: 'jobNo',
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
