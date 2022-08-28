<template>
  <v-app id="main">
    <v-main style="padding: 20px 0px 0px">
      <v-container>
        <v-row align="center">
          <v-col sm="7" md="8">
            <v-row
              :class="['teal lighten-5', 'text-left', 'rounded-lg']"
              justify="center"
              max-width="150px"
            >
              <v-col cols="12" v-for="n in 3" :key="n">
                <a href="">{{ newsList[n - 1] }}</a>
              </v-col>
            </v-row>
          </v-col>
          <v-col sm="3" offset-sm="2" md="4" offset-md="0">
            <v-img
              max-height="70"
              contain
              :aspect-ratio="1.0"
              :src="require('../../assets/qa.png')"
              :class="['mx-auto', 'ma-5']"
              @click="pagePush('/qa')"
            ></v-img>
          </v-col>
        </v-row>

        <v-row
          :class="[/**表示域確認用 'blue lighten-4', */ 'mt-10']"
          align-content="center"
        >
          <v-col
            cols="3"
            v-for="n in displayAuthorityList.length"
            :key="n"
            @click="nextCheck(displayAuthorityList[n - 1])"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 3 : 0"
                :class="{ 'on-hover': hover, 'pa-5': true, 'rounded-xl': true }"
              >
                <v-img
                  max-height="100"
                  max-width="400"
                  contain
                  :aspect-ratio="1.0"
                  :src="
                    require('../../assets/' +
                      displayAuthorityList[n - 1].value +
                      'Logo.png')
                  "
                  :class="['mx-auto', 'ma-5']"
                ></v-img>
                <h3>
                  {{ formatMenuTitle(displayAuthorityList[n - 1].value) }}
                </h3>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <v-dialog
          v-model="isShowAttendanceEditDialog"
          max-width="600px"
          persistent
        >
          <v-card>
            <v-app-bar flat color="info">
              <v-toolbar-title class="h2 white--text">
                勤怠入力
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon>
                <v-icon @click="closeAttendanceEditDialog()">mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>
              <v-container>
                <h2 class="my-4">{{ displayDate }}</h2>
                <h1 class="my-2">{{ displayTime }}</h1>
                <v-stepper
                  v-model="stepperCount"
                  alt-labels
                  color="info"
                  outlined
                >
                  <v-stepper-header>
                    <v-stepper-step
                      :complete="stepperCount > 1"
                      step="1"
                      editable
                      color="info"
                    >
                      勤務先を入力
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2" color="info">
                      勤怠を入力
                    </v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-tabs v-model="fieldEditTab" grow color="primary">
                        <v-tab>
                          jobNoを入力
                        </v-tab>
                        <v-tab>
                          客先から選択
                        </v-tab>
                        <v-tab-item>
                          <v-card flat>
                            <v-row align="center" class="ma-4">
                              <v-col md="3">
                                <p>jobNo</p>
                              </v-col>
                              <v-spacer></v-spacer>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  outlined
                                  dense
                                  v-model="selectJob.jobNo"
                                  placeholder="例）21-0001"
                                  maxlength="7"
                                  clearable
                                  clear-icon="mdi-close-circle"
                                  color="info"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card>
                          <v-row justify="center">
                            <v-checkbox
                              v-model="isCheckBox"
                              label="入力内容を保存しますか？"
                              color="info"
                            ></v-checkbox>
                          </v-row>
                        </v-tab-item>
                        <v-tab-item>
                          <v-card flat>
                            <v-card-text>
                              <v-row align="center">
                                <v-col md="3">
                                  <p>客先名</p>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" md="6">
                                  <v-select
                                    v-model="selectJob.selectClientField"
                                    label="(例)株式会社ABC"
                                    :items="clientFieldList"
                                    item-text="clientFieldName"
                                    item-value="value" 
                                    return-object outlined required
                                    dense
                                    color="info"
                                  ></v-select>
                                </v-col>
                              </v-row>
                              <v-row align="center">
                                <v-col md="3">
                                  <p>現場名</p>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" md="6">
                                  <v-select
                                    v-model="selectJob.selectWorkField"
                                    label="(例)株式会社ABC"
                                    :items="workFieldList"
                                    item-text="workFieldName"
                                    item-value="value" 
                                    return-object outlined required
                                    dense
                                    color="info"
                                  ></v-select>
                                </v-col>
                              </v-row>
                              <v-row align="center">
                                <v-col md="3">
                                  <p>工事件名</p>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" md="6">
                                  <v-select
                                    v-model="selectJob.selectWorkFieldDetail"
                                    label="(例)株式会社ABC"
                                    :items="workFieldDetailList"
                                    item-text="workFieldDetailName"
                                    item-value="value" 
                                    return-object outlined required
                                    dense
                                    color="info"
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-tab-item>
                      </v-tabs>
                      <v-btn color="info mt-2" @click="stepperCount = 2">
                        次へ
                      </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <v-row align="center">
                        <v-col md="3">
                          <p>勤怠ステータス</p>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="selectStatus"
                            :items="statusItems"
                            outlined
                            dense
                            color="info"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col md="3">
                          <p>備考欄</p>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" md="6">
                          <v-textarea
                            v-model="inputNoteContents"
                            outlined
                            color="info"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <v-btn color="info" @click="stepperCount = 1">
                        勤怠を登録
                      </v-btn>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export default {
  name: "mainMenu",
  components: {},
  mounted: async function() {
    this.getToDay();
    this.getToTime();
  },
  computed: {
    displayAuthorityList: function() {
      return this.menuAuthorityList.filter(item => item.permission === true);
    }
  },
  data: () => ({
    // TODO ログイン認証処理が完了したら、画面で持ってるemployeeIDをセットする
    userId: '6tQPHzHQwlGErXeLSzt1',
    // ※現在(2022/03/01)は、契約が一社のため、固定でIDを設定
    // ※複数社契約になった場合、セッションで契約IDを保持して、
    // ※そのIDをもとに検索するように修正
    contractorId: '00000001',
    clientFieldList: [],
    workFieldList: [],
    workFieldDetailList: [],
    workFieldResponse: {},
    workFieldDetailResrponse: {},
    selectJob: {},
    newsList: [
      "【機能改善】自社員管理機能が新しくなりました。",
      "【年末年始について】年末年始営業情報についてこちらをはご参照ください。",
      "【障害】現在つながりにくい状態が続いております。"
    ],
    menuAuthorityList: [
      { type: "page", value: "attendanceManage", permission: true },
      { type: "page", value: "contactBox", permission: true },
      { type: "page", value: "workField", permission: true },
      { type: "page", value: "subCompanyAll", permission: true },
      { type: "page", value: "ownWorkerAll", permission: true },
      { type: "dialog", value: "editAttendance", permission: true }
    ],
    statusItems: [
      { text: "出勤", value: 0 },
      { text: "休憩", value: 1 },
      { text: "戻り", value: 0 },
      { text: "退勤", value: 2 },
      { text: "早退", value: 4 },
      { text: "早出", value: 5 },
      { text: "遅出", value: 6 },
      { text: "深夜", value: 7 },
      { text: "欠勤", value: 8 }
    ],
    displayDate: "",
    displayTime: "",
    stepperCount: 1,
    inputJobNo: "",
    inputNoteContents: "",
    isCheckBox: true,
    fieldEditTab: 0,
    selectCompany: "",
    selectField: "",
    selectWorkField: "",
    selectStatus: "",
    isShowAttendanceEditDialog: false
  }),
  methods: {
    // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う
    async post() {},
    formatMenuTitle(item) {
      switch (item) {
        case "attendanceManage":
          return "出退勤管理";
        case "contactBox":
          return "管理者通知";
        case "workField":
          return "客先・現場編集";
        case "subCompanyAll":
          return "協力会社管理";
        case "ownWorkerAll":
          return "自社員管理";
        case "editAttendance":
          return "勤怠入力";
        default:
          return "";
      }
    },
    async nextCheck(item) {
      if (item.type === "page") {
        this.pagePush(item.value);
      } else {
        this.isShowAttendanceEditDialog = true;
        let response = await Methods.getAttendance(this.contractorId, this.userId);
        // レスポンスから画面情報をセットする
        this.clientFieldList = this.createClientFieldList(response);
        this.workFieldResponse = response.data.workFieldResponse
        this.workFieldDetailResponse = response.data.workFieldDetailResponse
        this.workFieldList = this.createWorkFieldList();
        this.workFieldDetailList = this.createWorkFieldDetailLiist();
        this.selectJob = response.data.selectJob;
      }
    },
    pagePush(pageName) {
      this.$router.push(pageName);
    },
    getToDay() {
      const now = dayjs();
      this.displayDate = now.format("YYYY年MM月DD日");
    },
    getToTime() {
      setInterval(() => {
        const now = dayjs();
        this.displayTime = now.format("HH：mm：ss");
      }, 100);
    },
    closeAttendanceEditDialog() {
      this.isShowAttendanceEditDialog = false;
    },
     /** 客先名セレクトボックス作成処理 */
    createClientFieldList (response) {
      var clientFieldResponse = response.data.clientFieldResponse
      var clientFieldList = []
      for (var j = 0; j < clientFieldResponse.length; j++) {
        var clientField = {}
        clientField.clientFieldId = clientFieldResponse[j].clientFieldId
        clientField.clientFieldName = clientFieldResponse[j].clientFieldName
        clientFieldList.push(clientField)
      }
      return clientFieldList
    },
    /** 現場セレクトボックス作成処理 */
    createWorkFieldList () {
      var workFieldList = [];
      var clientFieldId = "";
      if(this.selectJob.selectClientField != null){
        let selectClientField = JSON.parse(JSON.stringify(this.selectJob.selectClientField))
        clientFieldId = selectClientField.clientFieldId;
      }
      for (var i = 0; i < this.workFieldResponse.length; i++) {
        // 選択した客先に紐づく現場のみ表示します。
        if(clientFieldId === this.workFieldResponse[i].clientFieldId){
          var workField = {}
          workField.workFieldId = this.workFieldResponse[i].workFieldId
          workField.workFieldName = this.workFieldResponse[i].workFieldName
          workFieldList.push(workField)
        }
      }
      return workFieldList;
    },
    /** 現場詳細セレクトボックス作成処理 */
    createWorkFieldDetailLiist () {
      var workFieldDetailList = [];
      var workFieldId = "";
      if(this.selectJob.selectWorkField != null){
        let selectWorkField = JSON.parse(JSON.stringify(this.selectJob.selectWorkField))
        workFieldId = selectWorkField.workFieldId;
      }
      for (var i = 0; i < this.workFieldDetailResponse.length; i++) {
        // 選択した客先に紐づく現場のみ表示します。
        if(workFieldId === this.workFieldDetailResponse[i].workFieldId){
          var workFieldDetail = {}
          workFieldDetail.workFieldDetailId = this.workFieldDetailResponse[i].workFieldDetailId
          workFieldDetail.workFieldDetailName = this.workFieldDetailResponse[i].workFieldDetailName
          workFieldDetailList.push(workFieldDetail)
        }
      }
      return workFieldDetailList
    },
    /** 客先セレクトボックス押下処理 */
    selectCleintField() {
      // 現場セレクトボックスを作成します。
      this.workFieldList = this.createWorkFieldList();
      // this.detailEdit = {
      //   "employeeId": this.detailEdit.employeeId,
      //   "jobNo":"",
      //   "selectClientField":this.detailEdit.selectClientField,
      //   "selectWorkField":"",
      //   "selectWorkFieldDetail":"",
      //   "clientFieldName":this.detailEdit.clientFieldName,
      //   "workFieldName":"",
      //   "workFieldDetailName":"",
      // };
    },
    /** 現場セレクトボックス押下処理 */
    selectWorkField() {
      // 現場詳細セレクトボックスを作成します。
      this.workFieldDetailList = this.createWorkFieldDetailLiist();
      // this.detailEdit = {
      //   "employeeId": this.detailEdit.employeeId,
      //   "jobNo":"",
      //   "selectClientField":this.detailEdit.selectClientField,
      //   "selectWorkField":this.detailEdit.selectWorkField,
      //   "selectWorkFieldDetail":"",
      //   "clientFieldName":this.detailEdit.clientFieldName,
      //   "workFieldName":this.detailEdit.workFieldName,
      //   "workFieldDetailName":"",
      // };
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
