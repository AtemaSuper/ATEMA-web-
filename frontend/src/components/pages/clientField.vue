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
              <v-btn @click="showEditClientField()" outlined elevation="3">
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
              :items="clientFieldList"
              :search="searchClientField"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="-1"
              item-key="name"
              class="elevation-1 table"
              rowsPerPage: All
              height= '300'
              @click:row="showEditClientField"
            >
              <template v-slot:top>
                <v-row >
                  <v-col cols='4'>
                    <!-- 検索窓 -->
                    <v-text-field
                      v-model="searchClientField"
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
                <v-btn @click.stop="onClickDeleteClientField(item)" color="#00ffd0" elevation="3" outlined fab height="2.5rem" width="2.5rem">
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
                <v-btn @click="showEditWorkField()" outlined elevation="3">
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
                :items="workFieldList"
                :search="searchWorkField"
                :custom-filter="filterOnlyCapsText"
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
                        v-model="searchWorkField"
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
                  <v-btn @click.stop="onClickDeleteWorkField(item)" color="#00ffd0" elevation="3" outlined fab height="2.5rem" width="2.5rem">
                    <v-icon large>mdi-delete-empty</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-row>
          </v-sheet>
<!-- 客先編集ダイアログ -->
          <v-dialog v-model="clientFieldDialog" persistent max-width="480">
            <v-card>
              <v-card-title class="text-h6 grey lighten-2">
                {{clientFieldDialogName}}
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
                    <v-text-field v-model="clientFieldEditItem.clientFieldName" :rules="clientRules"  label="(例)株式会社ABC" maxlength='100' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
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
                    <v-radio-group v-model="clientFieldEditItem.status" row>
                      <v-radio label="未進行" value="0" color="#ff6669"></v-radio>
                      <v-radio label="進行中" value="1" color="#ff6669"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ff6669" class="white--text" rounded @click="saveClientField(item)">
                  OK
                </v-btn>
                <v-btn @click="closeclientFieldDialog()" class="#f5f5f5" rounded>
                  キャンセル
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
<!-- 現場編集ダイアログ -->
          <v-dialog v-model="workFieldDialog" persistent max-width="480">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                {{workFieldDialogName}}
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
                    <v-select v-model="workFieldEditItem.selectClientField" label="(例)株式会社ABC" :items="clientFieldList" item-text="clientFieldName"
            item-value="value" return-object outlined required></v-select>
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
                    <v-text-field v-model="workFieldEditItem.workName" :rules="workFieldRules"  label="(例)現場名ABC" maxlength='100' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
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
                    <v-radio-group v-model="workFieldEditItem.status" row>
                      <v-radio label="未進行" value="0" color="#ff6669"></v-radio>
                      <v-radio label="進行中" value="1" color="#ff6669"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ff6669" class="white--text" rounded @click="saveWorkField()">
                  OK
                </v-btn>
                <v-btn @click="closeworkFieldDialog()" class="#f5f5f5" rounded>
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
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'


export default {
  name: 'attendanceManage',
  components: {
  },
  data: () => ({
    clientFieldList: [],
    workFieldList: [],
    selectClientFieldList: [],
    clientFieldEditItem: [],
    workFieldEditItem: [],
    clientProgress: 'inProgress',
    fieldProgress: 'inProgress',
    searchClientField: '',
    searchWorkField: '',
    editItem: {},
    clientFieldDialog: false,
    clientFieldDialogName: '客先編集',
    workFieldDialog: false,
    workFieldDialogName: '現場編集',
    workName: '',
    workFieldRules: [
      v => !!v || '客先名が未入力です',
      v => (!!v && v.length <= 100) || `文字数は100文字以内です`
    ],
    clientFieldName: '',
    clientRules: [
      v => !!v || '現場名が未入力です',
      v => (!!v && v.length <= 100) || `文字数は100文字以内です`
    ]
  }),
  mounted: function () {
    // 現場編集の画面情報をとってきます。
    this.getClientFieldInfo()
  },
  computed: {
    /** v-tableのヘッダーを設定 */
    clientHeader () {
      return [
        {
          text: '客先',
          align: 'center',
          sortable: false,
          value: 'clientFieldName',
          width: '70%'
        },
        {
          text: 'ステータス',
          value: 'statusName',
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
          value: 'selectClientField.clientFieldName',
          width: '20%'
        },
        {
          text: '現場名',
          value: 'workName',
          align: 'center',
          width: '50%'
        },
        {
          text: 'ステータス',
          value: 'statusName',
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
  },
  methods: {
    
    //* * 共通 */ 

    // 初期表示処理です。
    async getClientFieldInfo () {
      let response = await Methods.getClientFieldInfo()
      // レスポンスから画面情報をセットする
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
      this.selectClientFieldList = createSelectClientFieldList(response)
    },
    // 検索処理です。
    filterOnlyCapsText (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    
    //* * 客先一覧 */ 

    // 客先編集 ダイアログ表示処理
    showEditClientField (item) {
      // 編集の場合
      if(item !== undefined){
        this.clientFieldEditItem = item
        this.worDialogName = '客先編集'
      // 追加の場合
      }else{
        // 入力項目に初期値を設定
        this.clientFieldEditItem = {
          status: '0',
        }
        this.clientFieldDialogName = '客先追加'
      }
      this.clientFieldDialog = true
    },
    // 客先編集 ダイアログ閉じる処理
    closeclientFieldDialog () {
      this.clientFieldEditItem = []
      this.clientFieldDialog = false
    },
    // 客先編集 保存処理
    async saveClientField () {
      const param = {
        clientFieldId: this.clientFieldEditItem.clientFieldId,
        clientFieldName: this.clientFieldEditItem.clientFieldName,
        status: Number(this.clientFieldEditItem.status),
        createUserId: '', // TODO ログインユーザのユーザIDをセットする(新規の時だけ)
          updateUserId: '' // TODO ログインユーザのユーザIDをセットする
      }
      // 保存処理
      let response = await Methods.saveClientField(param)
      // レスポンスから画面情報をセットする
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
      this.selectClientFieldList = createSelectClientFieldList(response)
      this.clientFieldDialog = false
      // 保存完了メッセージ表示
      this.$emit('alertMethod', response);
    },
        
    //* * 現場一覧 */ 

    // 現場編集 ダイアログ表示処理
    showEditWorkField (item) {
      // 編集の場合
      if(item !== undefined){
        this.workFieldEditItem = item
        this.workFieldDialogName = '客先編集'
      // 追加の場合
      }else{
        // 入力項目に初期値を設定
        this.workFieldEditItem = {
          status: '0',
        }
        this.workFieldDialogName = '客先追加'
      }
      this.workFieldDialog = true
    },
    // 現場編集 ダイアログ閉じる処理
    closeworkFieldDialog () {
      this.workFieldEditItem = []
      this.workFieldDialog = false
    },
    // 現場編集 保存処理
    async saveWorkField () {
      const param = {
        workId: this.workFieldEditItem.workId,
        workName: this.workFieldEditItem.workName,
        clientFieldId: this.workFieldEditItem.selectClientField.clientFieldId,
        status: Number(this.workFieldEditItem.status),
        createUserId: '', // TODO ログインユーザのユーザIDをセットする(新規の時だけ)
          updateUserId: '' // TODO ログインユーザのユーザIDをセットする
      }
      // 保存処理
      let response = await Methods.saveWorkField(param)
      // レスポンスから画面情報をセットする
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
      this.selectClientFieldList = createSelectClientFieldList(response)
      this.workFieldDialog = false
      // 保存完了メッセージ表示
      this.$emit('alertMethod', response);
    },
    // 削除ボタン押下処理
    async onClickDeleteClientField (item) {
      const param = {
        clientFieldId: item.clientFieldId
      }
      // 削除処理
      let response = await Methods.deleteClientField(param)
      // レスポンスから画面情報をセットする
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
      this.selectClientFieldList = createSelectClientFieldList(response)
      this.clientFieldDialog = false
      // 削除完了メッセージ表示
      this.$emit('alertMethod', response);
    },
    // 削除ボタン押下処理
    async onClickDeleteWorkField (item) {
      const param = {
        workId: item.workId
      }
      // 削除処理
      let response = await Methods.deleteWorkField(param)
      // レスポンスから画面情報をセットする
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
      this.selectClientFieldList = createSelectClientFieldList(response)
      this.workFieldDialog = false
      // 削除完了メッセージ表示
      this.$emit('alertMethod', response);
    }
  }
}
//
// privateメソッドです。
//
/**
 * レスポンスをもとに画面情報(客先一覧)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createClientFieldList (response) {
  var clientFieldResponse = response.data.clientFieldResponse
  var clientFieldList = []
  for (var i = 0; i < clientFieldResponse.length; i++) {
    var clientField = {}
    clientField.clientFieldId = clientFieldResponse[i].objectId
    clientField.clientFieldName = clientFieldResponse[i].clientFieldName
    clientField.status = String(clientFieldResponse[i].status)
    clientField.statusName = getStatusName(
      clientFieldResponse[i].status
    )
    clientFieldList.push(clientField)
  }
  return clientFieldList
}
/**
 * レスポンスをもとに画面情報(現場一覧)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createWorkFieldList (response) {
  var workFieldResponse = response.data.workFieldResponse
  var clientFieldResponse = response.data.clientFieldResponse
  var workFieldList = []
  for (var j = 0; j < workFieldResponse.length; j++) {
    var workField = {}
    workField.workId = workFieldResponse[j].objectId
    workField.workName = workFieldResponse[j].workName
    // 選択中の客先名を設定
    workField.selectClientField = {
      clientFieldId: workFieldResponse[j].clientFieldId,
      clientFieldName: getClientFieldName(
        workFieldResponse[j].clientFieldId,
        clientFieldResponse
      )
    }
    workField.status = String(workFieldResponse[j].status)
    workField.statusName = getStatusName(
      workFieldResponse[j].status
    )
    workFieldList.push(workField)
  }
  return workFieldList
}
/**
 * レスポンスをもとに画面情報(客先名セレクトボックス)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createSelectClientFieldList (response) {
  var clientFieldResponse = response.data.clientFieldResponse
  var clientFieldList = []
  for (var j = 0; j < clientFieldResponse.length; j++) {
    var clientField = {}
    clientField.clientFieldId = clientFieldResponse[j].objectId
    clientField.clientFieldName = clientFieldResponse[j].clientFieldName
    clientFieldList.push(clientField)
  }
  return clientFieldList
}
/**
 * 客先IDをもとに客先名を取得します。
 *
 * @param {string} clientFieldId 工種IDです。
 * @param {object} clientFieldResponse 工種のレスポンスデータです。
 *
 * @private
 * @returns
 */
function getClientFieldName (clientFieldId, clientFieldResponse) {
  var clientFieldName = ''
  for (var i = 0; i < clientFieldResponse.length; i++) {
    if (clientFieldId === clientFieldResponse[i].objectId) {
      clientFieldName = clientFieldResponse[i].clientFieldName
    }
  }
  return clientFieldName
}
/**
 * ステータスをもとにステータス名を取得します。
 *
 * @param {string} status ステータスです。
 *
 * @private
 * @returns
 */
function getStatusName (status) {
  if (status === 0) {
    return '未進行'
  } else {
    return '進行中'
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
