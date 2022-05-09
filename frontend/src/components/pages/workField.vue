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
            :items="workFieldDetailList"
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
          {{worDialogName}}
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
                <v-text-field v-model="editItem.jobNo" :rules="JobRules"  label="(例)21-0001" maxlength='7' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
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
                <v-select v-model="editItem.selectClientField" label="(例)株式会社ABC" :items="clientFieldList" item-text="clientFieldName"
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
                <v-select  v-model="editItem.selectWork" label="(例)現場名A" :items="workFieldList" item-text="workName"
            item-value="value" return-object outlined required></v-select>
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
                <v-text-field v-model="editItem.workFieldName" :rules="constructionRules" label="(例)工事件名１－ABC" maxlength='100' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
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
                <v-radio-group v-model="editItem.status" row>
                  <v-radio label="未進行" value="0" color="#ff6669"></v-radio>
                  <v-radio label="進行中" value="1" color="#ff6669"></v-radio>
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
                <v-radio-group v-model="editItem.contractStatus" row>
                  <v-radio label="常用" value="0" color="#ff6669"></v-radio>
                  <v-radio label="請負" value="1" color="#ff6669"></v-radio>
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
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'
export default {
  components: {
  },
  data: () => ({
    workFieldDetailList: [],
    clientFieldList: [],
    workFieldList: [],
    editItem: [],
    worDialogName: '工事編集',
    workFieldDialog: false,
    JobName: '',
    searchWorkField:'',
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
  mounted: function () {
    // 現場編集の画面情報をとってきます。
    this.getWorkFieldInfo()
  },
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
          value: 'selectClientField.clientFieldName',
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
          value: 'selectWork.workName',
          align: 'center',
          width: '18%'
        },
        {
          text: 'ステータス',
          value: 'statusName',
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
    }
  },
  methods: {
    // 初期表示処理です。
    async getWorkFieldInfo () {
      let response = await Methods.getWorkFieldInfo()
      // レスポンスから画面情報をセットする
      this.workFieldDetailList = createWorkFieldDetailList(response)
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
    },
    // 工事一覧の検索処理です。
    filterOnlyCapsText (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    // 現場編集 ダイアログ表示処理
    showEditWorkField (item) {
      // 編集の場合
      if(item !== undefined){
        this.editItem = item
        this.worDialogName = '工事編集'
      // 追加の場合
      }else{
        // 入力項目に初期値を設定
        this.editItem = {
          workFieldId: '',
          status: '0',
          contractStatus: '0'
        }
        this.worDialogName = '工事追加'
      }
      this.workFieldDialog = true
    },
    // 現場編集 ダイアログ閉じる処理
    closeWorkFieldDialog () {
      this.editItem = []
      this.workFieldDialog = false
    },
    // 現場編集 保存処理
    async saveWorkFieldInfo () {
      const param = {
        workFieldId: this.editItem.workFieldId,
        workFieldName: this.editItem.workFieldName,
        jobNo: this.editItem.jobNo,
        clientFieldId: this.editItem.selectClientField.clientFieldId,
        workId: this.editItem.selectWork.workId,
        status: Number(this.editItem.status),
        contractStatus: Number(this.editItem.contractStatus),
        createUserId: '', // TODO ログインユーザのユーザIDをセットする(新規の時だけ)
        updateUserId: '' // TODO ログインユーザのユーザIDをセットする
      }
      // 保存処理
      let response = await Methods.saveWorkFieldInfo(param)
      // レスポンスから画面情報をセットする
      this.workFieldDetailList = createWorkFieldDetailList(response)
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
      this.workFieldDialog = false
      // TODO 保存完了メッセージ表示
      console.log(response)
    },
    // 削除ボタン押下処理
    async onClickDelete (item) {
      const param = {
        workFieldId: item.workFieldId
      }
      // 削除処理
      let response = await Methods.deleteWorkFieldInfo(param)
      // レスポンスから画面情報をセットする
      this.workFieldDetailList = createWorkFieldDetailList(response)
      this.clientFieldList = createClientFieldList(response)
      this.workFieldList = createWorkFieldList(response)
      // TODO 削除完了メッセージ表示
      console.log(response)
    }
  }
}
//
// privateメソッドです。
//
/**
 * レスポンスをもとに画面情報を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createWorkFieldDetailList (response) {
  var workFieldDetailResponse = response.data.workFieldDetailResponse
  var clientFieldResponse = response.data.clientFieldResponse
  var workFieldResponse = response.data.workFieldResponse
  // 工事一覧表示用に変換します。
  var workFieldDetailList = []
  for (var i = 0; i < workFieldDetailResponse.length; i++) {
    var workFieldDetail = {}
    workFieldDetail.workFieldId = workFieldDetailResponse[i].objectId
    workFieldDetail.workFieldName = workFieldDetailResponse[i].workFieldName
    workFieldDetail.jobNo = workFieldDetailResponse[i].jobNo
    // 選択中の工事件名を設定
    workFieldDetail.selectWork = {
      workId: workFieldDetailResponse[i].workId,
      workName: getWorkName(
        workFieldDetailResponse[i].workId,
        workFieldResponse
      )
    }
    // 選択中の客先名を設定
    workFieldDetail.selectClientField = {
      clientFieldId: workFieldDetailResponse[i].clientFieldId,
      clientFieldName: getClientFieldName(
        workFieldDetailResponse[i].clientFieldId,
        clientFieldResponse
      )
    }
    workFieldDetail.status = String(workFieldDetailResponse[i].status)
    workFieldDetail.statusName = getStatusName(
      workFieldDetailResponse[i].status
    )
    workFieldDetail.contractStatus = String(workFieldDetailResponse[i].contractStatus)
    workFieldDetail.createUserId = workFieldDetailResponse[i].createUserId
    workFieldDetail.updateUserId = workFieldDetailResponse[i].updateUserId
    workFieldDetailList.push(workFieldDetail)
  }

  return workFieldDetailList
}
/**
 * レスポンスをもとに画面情報(客先名セレクトボックス)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createClientFieldList (response) {
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
 * レスポンスをもとに画面情報(現場名セレクトボックス)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createWorkFieldList (response) {
  var workFieldResponse = response.data.workFieldResponse
  var workFieldList = []
  for (var k = 0; k < workFieldResponse.length; k++) {
    var workField = {}
    workField.workId = workFieldResponse[k].objectId
    workField.workName = workFieldResponse[k].workName
    workFieldList.push(workField)
  }
  return workFieldList
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
 * 工事IDをもとに工事件名を取得します。
 *
 * @param {string} workId 工種IDです。
 * @param {object} workFieldResponse 工種のレスポンスデータです。
 *
 * @private
 * @returns
 */
function getWorkName (workId, workFieldResponse) {
  var workName = ''
  for (var i = 0; i < workFieldResponse.length; i++) {
    if (workId === workFieldResponse[i].objectId) {
      workName = workFieldResponse[i].workName
    }
  }
  return workName
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
</style>
