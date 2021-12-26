<template>
  <v-app id="clientField">
<!-- 客先一覧 -->
      <v-container>
        <v-sheet color="white table-display" rounded outlined>
          <v-row align="center" >
            <v-col cols="12" sm="4" md="2"></v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 客先を追加するボタン -->
              <v-btn
              outlined
              @click="showEditClient()"
              >客先を追加<v-icon >mdi-plus</v-icon></v-btn>
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
                <v-btn @click.stop="onClickDelete(item)">
                  <v-icon color="green darken-2">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-row>
        </v-sheet>
      </v-container>
<!-- 現場一覧 -->
      <v-row class="title">
        <v-col>
          <v-card>現場一覧</v-card>
        </v-col>
      </v-row>
      <v-card>
        <v-container>
          <v-sheet color="white table-display" rounded outlined>
            <v-row align="center" >
              <v-col cols="12" sm="4" md="2"></v-col>
              <v-col cols="12" sm="4" md="4"> </v-col>
              <v-col cols="12" sm="4" md="4"> </v-col>
              <v-col cols="12" sm="4" md="2">
                <!-- 現場を追加するボタン -->
                <v-btn
                outlined
                @click="showEditField()"
                >現場を追加<v-icon >mdi-plus</v-icon></v-btn>
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
<!-- 客先編集ダイアログ -->
          <v-dialog v-model="clientDialog" max-width="480">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
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
                      <v-radio label="進行中" value="inProgress"></v-radio>
                      <v-radio label="未進行" value="notProgress"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="saveClientInfo(item)">確定</v-btn>
                <v-btn @click="closeClientDialog">キャンセル</v-btn>
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
                      <v-radio label="進行中" value="inProgress"></v-radio>
                      <v-radio label="未進行" value="notProgress"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="saveFieldInfo(item)">確定</v-btn>
                <v-btn @click="closeFieldDialog">キャンセル</v-btn>
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
</style>
