<template>
  <v-app id="clientField">
<!-- 客先一覧 -->
  <v-card>
    <v-container>
      <h2>客先一覧</h2>
        <v-sheet color="white" rounded outlined>
          <v-row align="center" >
            <v-col cols="12" sm="4" md="2"></v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 客先を追加するボタン -->
              <v-btn @click="showEditClient()" outlined elevation="3">
                客先を追加
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
              :headers="clientHeader"
              :items="getClient"
              :search="searchClient"
              :custom-filter="searchClient"
              :items-per-page="-1"
              item-key="name"
              class="elevation-1 table"
              rowsPerPage: All
              height= '300'
              @click:row="showEditClient"
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
                <v-btn @click.stop="onClickDelete(item)" color="#00ffd0" elevation="3" outlined fab height="2.5rem" width="2.5rem">
                  <v-icon large>mdi-delete-empty</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-row>
        </v-sheet>
  </v-container>
    </v-card>
<!-- 現場一覧 -->
    <div class="page-border-area">
      <div class="page-border"></div>
    </div>
      <v-card>
        <h2>現場一覧</h2>
        <v-container>
          <v-sheet color="white" rounded outlined>
            <v-row align="center" >
              <v-col cols="12" sm="4" md="2"></v-col>
              <v-col cols="12" sm="4" md="4"> </v-col>
              <v-col cols="12" sm="4" md="4"> </v-col>
              <v-col cols="12" sm="4" md="2">
                <!-- 現場を追加するボタン -->
                <v-btn @click="showEditField()" outlined elevation="3">
                  現場を追加
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
                :headers="fieldHeader"
                :items="getField"
                :search="searchField"
                :custom-filter="searchField"
                :items-per-page="-1"
                item-key="name"
                class="elevation-1 table"
                rowsPerPage: All
                height= '300'
                @click:row="showEditField"
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
<!-- 客先編集ダイアログ -->
          <v-dialog v-model="clientDialog" max-width="480">
            <v-card>
              <v-card-title class="text-h6 grey lighten-2">
                客先編集
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">客先名</div>
                  </v-col>
                  <v-col cols="2">
                    <div class="item-required">
                      <v-chip color="red" dark>必須</v-chip></div>
                  </v-col>
                  <v-col>
                    <v-text-field></v-text-field>
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
                    <v-radio-group v-model="clientProgress" row>
                      <v-radio label="進行中" value="inProgress" color="#ff6669"></v-radio>
                      <v-radio label="未進行" value="notProgress" color="#ff6669"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ff6669" class="white--text" rounded @click="saveClientInfo(item)">
                  OK
                </v-btn>
                <v-btn @click="closeClientDialog()" class="#f5f5f5" rounded>
                  キャンセル
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
<!-- 現場編集ダイアログ -->
          <v-dialog v-model="fieldDialog" max-width="480">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                現場編集
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">客先名</div>
                  </v-col>
                  <v-col cols="2">
                    <div class="item-required">
                      <v-chip color="red" dark>必須</v-chip></div>
                  </v-col>
                  <v-col>
                    <v-select></v-select>
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
                    <v-text-field></v-text-field>
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
                    <v-radio-group v-model="fieldProgress" row>
                      <v-radio label="進行中" value="inProgress" color="#ff6669"></v-radio>
                      <v-radio label="未進行" value="notProgress" color="#ff6669"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ff6669" class="white--text" rounded @click="saveFieldInfo(item)">
                  OK
                </v-btn>
                <v-btn @click="closeFieldDialog()" class="#f5f5f5" rounded>
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
/** VueTimepicker（時刻選択用ライブラリ） */
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  name: 'attendanceManage',
  components: {
    VueTimepicker
  },
  data: () => ({
    searchClient: '',
    searchField: '',
    clientProgress: 'inProgress',
    fieldProgress: 'inProgress',
    editItem: {},
    clientDialog: false,
    fieldDialog: false
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    clientHeader () {
      return [
        {
          text: '客先',
          align: 'center',
          sortable: false,
          value: 'clientName',
          width: '70%'
        },
        {
          text: 'ステータス',
          value: 'status',
          align: 'center',
          width: '20%'
        },
        { text: '削除',
          sortable: false,
          value: 'delete',
          align: 'center',
          width: '10%'}
      ]
    },
    /** v-tableのヘッダーを設定 */
    fieldHeader () {
      return [
        {
          text: '客先',
          align: 'center',
          sortable: false,
          value: 'clientName',
          width: '20%'
        },
        {
          text: '現場名',
          value: 'fieldName',
          align: 'center',
          width: '50%'
        },
        {
          text: 'ステータス',
          value: 'status',
          align: 'center',
          width: '20%'
        },
        { text: '削除',
          value: 'delete',
          sortable: false,
          align: 'center',
          width: '10%'}
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getClient () {
      /** ToDo */
      /** Vuex clientで定義したActionメソッドをここで呼び出し */
      return this.$store.state.clientFieldList.clientList
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getField () {
      /** ToDo */
      /** Vuex fieldListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.clientFieldList.fieldList
    }
  },
  methods: {
    // ページ遷移処理
    download (format) {
      console.log(format)
    },
    // 検索
    searchClient (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    // 検索
    searchField (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    /** データ変更処理 */
    setItem (item) {
      /** ToDo vuex 必要ないかも？ */
      /** 2-Vuex attendanceListで定義したActionメソッドをここで呼び出し 変更箇所の引数あり */
      /** 1-NCMBのデータ更新処理呼び出し express側定義 axioメソッド */
      console.log(item)
    },
    // 客先編集 ダイアログ表示処理
    showEditClient (item) {
      this.editItem = item
      this.clientDialog = true
    },
    // 客先編集 ダイアログ閉じる処理
    closeClientDialog () {
      this.editItem = []
      this.clientDialog = false
    },
    // 客先編集 保存処理
    saveClientInfo (item) {
      // TODO 保存処理
      this.clientDialog = false
    },
    // 現場編集 ダイアログ表示処理
    showEditField (item) {
      this.editItem = item
      this.fieldDialog = true
    },
    // 現場編集 ダイアログ閉じる処理
    closeFieldDialog () {
      this.editItem = []
      this.fieldDialog = false
    },
    // 現場編集 保存処理
    saveFieldInfo (item) {
      // TODO 保存処理
      this.fieldDialog = false
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
.page-border-area {
  padding-top: 30px;
  padding-bottom: 30px;
}
.page-border {
  border-bottom: 1px solid;
  border-color: #cccccc;
}
</style>
