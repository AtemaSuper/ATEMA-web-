<template>
  <v-app id="inspire">
    <!-- 基本情報 -->
    <div v-if="pageContents == 1">
      <v-row class="justify-start">
        <v-col cols="1" class="page-contents-title">基本情報</v-col>
        <v-col cols="10"></v-col>
        <v-col cols="1">
          <v-btn color="#ff6669" class="white--text" rounded @click="onTouchSave()">
            OK
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">会社名</v-col>
        <v-col cols="3">
          <v-text-field
            v-model="ownCompanyData.contractorName"
            outlined
            label="(例)株式会社ATEMA"
            :rules="companyRules"
            name="contractorName"
            maxlength="100"
            clearable
            clear-icon="mdi-close-circle"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">設立</v-col>
        <v-col cols="2" sm="3" md="3"
          ><v-menu
            ref="foundationMenu"
            v-model="foundationMenu"
            :close-on-content-click="false"
            :return-value.sync="foundationMenu"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="displayDateFormat(ownCompanyData.foundation)"
                :rules="foundationRules"
                label="日付を選択"
                placeholder="まず20XX年X月をクリック"
                prepend-inner-icon="mdi-calendar"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="ownCompanyData.foundation"
              no-title
              scrollable
              locale="jp-ja"
              :day-format="(date) => new Date(date).getDate()"
            >
              <v-btn
                color="#ff6669"
                class="white--text"
                rounded
                @click="$refs.foundationMenu.save(ownCompanyData.foundation)"
              >
                OK
              </v-btn>
              <v-btn class="#f5f5f5" rounded @click="foundationMenu = false">
                キャンセル
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">代表者</v-col>
        <v-col cols="3">
          <v-text-field
            v-model="ownCompanyData.leaderName"
            outlined
            :rules="presidentRules"
            name="president"
            label="(例)宛間太郎"
            maxlength="50"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">郵便番号</v-col>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.postNumber1"
            outlined
            :rules="postNumberFirstRules"
            name="postNumberFirst"
            label="123"
            maxlength="3"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="2">
          <v-text-field
            v-model="ownCompanyData.postNumber2"
            outlined
            :rules="postNumberLastRules"
            name="postNumberLast"
            label="4567"
            maxlength="4"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">住所</v-col>
        <v-col cols="3">
          <v-text-field
            v-model="ownCompanyData.address"
            outlined
            :rules="addressRules"
            name="address"
            label="(例)千葉県宛間市宛間123-4"
            maxlength="100"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">電話番号</v-col>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.telNumber1"
            outlined
            :rules="telNumberOneRules"
            name="telNumberOne"
            label="090"
            maxlength="4"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.telNumber2"
            outlined
            :rules="telNumberTwoRules"
            name="telNumberTwo"
            label="1234"
            maxlength="4"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.telNumber3"
            outlined
            :rules="telNumberThreeRules"
            name="telNumberThree"
            label="5678"
            maxlength="4"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">工種</v-col>
        <v-col cols="3">
          <v-select
            v-model="ownCompanyData.workTypeIdList[0]"
            :rules="workTypeRules"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="workTypePullDown"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.workTypeIdList.length >= 2"
            v-model="ownCompanyData.workTypeIdList[1]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="workTypePullDown"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.workTypeIdList.length >= 3"
            v-model="ownCompanyData.workTypeIdList[2]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="workTypePullDown"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.workTypeIdList.length >= 4"
            v-model="ownCompanyData.workTypeIdList[3]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="workTypePullDown"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.workTypeIdList.length >= 5"
            v-model="ownCompanyData.workTypeIdList[4]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="workTypePullDown"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="1">
          <v-btn
            v-if="ownCompanyData.workTypeIdList.length <= 4"
            color="#ff6669"
            class="white--text"
            fab
            @click="onTouchPlusBtn()"
            ><v-icon large>mdi-plus-thick</v-icon></v-btn
          >
        </v-col>
        <v-col cols="1">
          <v-btn
            v-if="ownCompanyData.workTypeIdList.length != 1"
            color="#00ffd0"
            elevation="3"
            outlined
            fab
            @click="onTouchDeleteBtn()"
            ><v-icon large>mdi-delete-empty</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- 勤怠情報 -->
    <div v-if="pageContents == 2">
      <v-row class="justify-start">
        <v-col cols="1" class="page-contents-title">勤怠情報</v-col>
        <v-col cols="10"></v-col>
        <v-col cols="1">
          <v-btn
            color="#ff6669"
            class="white--text"
            rounded
            @click="onTouchSave()"
          >
            OK
          </v-btn>
        </v-col>
      </v-row>
      <v-sheet color="white" rounded outlined>
          <div>
            <v-row>
              <v-col cols="2" class="item-label">
                <div>勤怠パターン</div>
                <div class="btn-add-pattern">
                  <v-btn v-if="showAddPatternBtn" outlined elevation="3"
                    @click="addAttendancePattern()"
                    >パターン追加
                    <v-icon color="#ff6669">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="8">
            <!-- data teble-->
            <v-data-table
              item-key="patternId"
              :headers="headers"
              :items="attendancePatternList"
              dense
              class="elevation-1 pattern-table"
            >
              <!-- 勤怠開始列 -->
              <template v-slot:[`item.workStartTime`]="{ item }">
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="6">
                    <v-text-field 
                      v-model="item.workStartTime" 
                      :rules="workStartTimeRules"
                      maxlength="5"
                      type="time"
                      outlined 
                      dense
                      class="table-input"
                      >
                    </v-text-field>
                  </v-col>
                </v-row>
              </template>
              <!-- 勤怠終了列 -->
              <template v-slot:[`item.workFinishTime`]="{ item }">
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="6">
                    <v-text-field 
                      v-model="item.workFinishTime"  
                      :rules="workFinishTimeRules"
                      maxlength="5"
                      type="time"
                      outlined 
                      dense
                      class="table-input"
                      >
                    </v-text-field>
                  </v-col>
                </v-row>
              </template>
              <!-- 勤怠時間列 -->
              <template v-slot:[`item.workingHours`]="{ item }">
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="7">
                    <v-text-field 
                      v-model="item.workingHours" 
                      :rules="workingHoursRules"
                      maxlength="3"
                      type="number"
                      step="0.1"
                      outlined 
                      dense
                      class="table-input"
                      >
                    </v-text-field>
                  </v-col>
                </v-row>
              </template>
              <!-- 削除ボタン -->
                <template v-slot:[`item.delete`]="{ item }">
                  <v-btn v-if="showDeletePatternBtn" @click.stop="onClickDeletePattern(item)" color="#00ffd0" elevation="3" outlined fab height="2.5rem" width="2.5rem">
                    <v-icon large>mdi-delete-empty</v-icon>
                  </v-btn>
                </template>
            </v-data-table>
          </v-col>
          </v-row>
        </div>
      </v-sheet>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="2" class="item-label">丸め</v-col>
        <v-col cols="3">
          <v-radio-group v-model="ownCompanyData.roundingTime" row>
            <v-radio label="15分" value="0" color="#ff6669"></v-radio>
            <v-radio label="30分" value="1" color="#ff6669"></v-radio>
            <v-radio label="指定" value="2" color="#ff6669"> </v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="1"
          class="item-label"
          v-if="ownCompanyData.roundingTime == '2'"
        >
          <v-text-field
            v-model="ownCompanyData.selectRoundingTime"
            outlined
            label="分"
            :rules="roundingTimeRules"
            name="roundingTime"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label"></v-col>
        <v-col cols="3">
          <v-radio-group v-model="ownCompanyData.updownSelect" row>
            <v-radio label="切り上げ" value="0" color="#ff6669"></v-radio>
            <v-radio label="切り捨て" value="1" color="#ff6669"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">遅刻の発生</v-col>
        <v-col cols="3">
          <v-radio-group v-model="ownCompanyData.tardyTime" row>
            <v-radio label="1分から" value="0" color="#ff6669"></v-radio>
            <v-radio label="0分から" value="1" color="#ff6669"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export default {
  name: 'OwnCompany',
  props: ['showContents'],
  data () {
    return {
      // TODO ログイン認証処理が完了したら、画面で持ってるemployeeIDをセットする
      userId: '6tQPHzHQwlGErXeLSzt1',
      // ※現在(2022/03/01)は、契約が一社のため、固定でIDを設定
      // ※複数社契約になった場合、セッションで契約IDを保持して、
      // ※そのIDをもとに検索するように修正
      contractorId: '00000001',
      ownCompanyData: {workTypeIdList: []},
      workTypePullDown: [],
      attendancePatternList: [],
      attendanceTimehh: "",
      attendanceTimemm: "",
      workingHours: "",
      tardyTime: '0',
      roundingTime: '0',
      foundationMenu: false,
      foundationName: "",
      companyRules: [
        v => !!v || '会社名が未入力です',
        v => (v && v.length <= 100) || '会社名は100文字以内です'
      ],
      foundationRules: [
        v => !!v || '設立が未選択です'
      ],
      presidentRules: [
        v => !!v || '代表者が未入力です',
        v => (v && v.length <= 50) || '代表者は50文字以内です'
      ],
      postNumberFirstRules: [
        v => !!v || '郵便番号1が未入力です',
        v => (v && v.length <= 3) || '郵便番号1は3文字以内です',
        v => /^[0-9]*$/.test(v) || '郵便番号1の入力は半角数字のみです'
      ],
      postNumberLastRules: [
        v => !!v || '郵便番号2が未入力です',
        v => (v && v.length <= 4) || '郵便番号2は4文字以内です',
        v => /^[0-9]*$/.test(v) || '郵便番号2の入力は半角数字のみです'
      ],
      addressRules: [
        v => !!v || '住所が未入力です',
        v => (v && v.length <= 100) || '住所は100文字以内です'
      ],
      telNumberOneRules: [
        v => !!v || '電話番号1が未入力です',
        v => (v && v.length <= 4) || '電話番号1は4文字以内です',
        v => /^[0-9]*$/.test(v) || '電話番号1の入力は半角数字のみです'
      ],
      telNumberTwoRules: [
        v => !!v || '電話番号2が未入力です',
        v => (v && v.length <= 4) || '電話番号2は4文字以内です',
        v => /^[0-9]*$/.test(v) || '電話番号2の入力は半角数字のみです'
      ],
      telNumberThreeRules: [
        v => !!v || '電話番号3が未入力です',
        v => (v && v.length <= 4) || '電話番号3は4文字以内です',
        v => /^[0-9]*$/.test(v) || '電話番号3の入力は半角数字のみです'
      ],
      workTypeRules: [
        v => !!v || '工種が未選択です',
      ],
      workStartTimeRules: [
        v => !!v || '勤怠開始時間が未入力です',
        v => /^[0-9]*$/.test(v) || '勤怠開始時間の入力は半角数字のみです'
      ],
      workFinishTimeRules: [
        v => !!v || '勤怠終了時間が未入力です',
        v => /^[0-9]*$/.test(v) || '勤怠終了時間の入力は半角数字のみです'
      ],
      workingHoursRules: [
        v => !!v || '勤怠時間が未入力です',
      ],
      roundingTimeRules: [
        v => !!v || '丸めで指定選択時、指定時間(分)が未入力です',
        v => (v && v.length <= 2) || '文字数は2文字以内です',
        v => /^[0-9]*$/.test(v) || '丸めで指定選択時、指定時間(分)の入力は半角数字のみです'
      ]
    }
  },
  mounted: function () {
    // 自社設定の画面情報をとってきます。
    this.getOwnComapanyInfo()
  },
  computed: {
    /** v-tableのヘッダーを設定 */
    headers() {
      return [
        {
          text: "No",
          align: "center",
          sortable: false,
          value: "patternId",
          width: '10%'
        },
        {
          text: "勤怠開始時間",
          align: "center",
          sortable: false,
          value: "workStartTime",
          width: '30%'
        },
        {
          text: "勤怠終了時間",
          align: "center",
          sortable: false,
          value: "workFinishTime",
          width: '30%'
        },
        {
          text: "勤怠時間",
          align: "center",
          sortable: false,
          value: "workingHours",
          width: '20%'
        },
        {
          text: "削除",
          align: "center",
          sortable: false,
          value: "delete",
          width: '10%'
        },
      ];
    },
    // 表示するページコンテンツを切り替えます。
    pageContents: {
      get: function () {
        return this.showContents
      },
      set: function (val) {
        this.showContents = val
      }
    },
    // 追加ボタンの表示・非表示を切り替えます。
    showAddPatternBtn() {
      // 勤怠パターンが10個の場合、追加ボタンを非表示にします。
      if(this.attendancePatternList.length !== 10) {
        return true;
      }
      return false;
    },
    // 削除ボタンの表示・非表示を切り替えます。
    showDeletePatternBtn() {
      // 勤怠パターンが1個の場合、削除ボタンを非表示にします。
      if(this.attendancePatternList.length !== 1) {
        return true;
      }
      return false;
    }
  },
  methods: {
    /** 初期表示処理です。 */ 
    async getOwnComapanyInfo () {
      let response = await Methods.getOwnComapanyInfo(this.contractorId)
      // レスポンスから画面情報をセットする
      this.ownCompanyData = this.createOwnCompanyData(response);
      this.workTypePullDown = this.createWorkTypePullDown(response);
      this.attendancePatternList = response.data.ownCompanyResponse.attendancePattern;
    },
    /** 時間詳細ダイアログ保存ボタン押下処理 */
    focusoutTimeInput(item) {
      console.log(item);
    },
    /** 時間詳細ダイアログ保存ボタン押下処理 */
    updateAttendancePattern(column, item, items, index) {
      
      // 勤怠開始時間の場合
      if(column === "workStartTime") {
        JSON.parse(JSON.stringify(this.attendancePatternList))[index].workStartTime = items;
      // 勤怠終了時間の場合
      }else if(column === "workEndTime") {
        JSON.parse(JSON.stringify(this.attendancePatternList))[index].workEndTime = items;
      // 勤怠時間
      }else if(column === "workingHours") {
        JSON.parse(JSON.stringify(this.attendancePatternList))[index].workingHours = items;
      }
      console.log(this.attendancePatternList)

    },
    /** 日付のフォーマット処理です。 */ 
    displayDateFormat(date) {
      return dayjs(date).format("YYYY/MM/DD");
    },
    /** 工種プラスボタン押下時の処理です。 */ 
    onTouchPlusBtn () {
      this.ownCompanyData.workTypeIdList.push({})
    },
    /** 工種削除ボタン押下時の処理です。 */ 
    onTouchDeleteBtn () {
      this.ownCompanyData.workTypeIdList.pop()
    },
    /** パターン追加ボタン押下処理 */
    addAttendancePattern () {
      // 登録できる最大まで登録していない場合(最大：10件)
      if(this.attendancePatternList.length < 10) {
        // 新規で追加します。
        var patternId = this.attendancePatternList.length + 1;
        this.attendancePatternList.push({
          patternId: patternId,
          workStartTime: "00:00", 
          workFinishTime: "00:00", 
          workingHours: 0, 
        })
      }
    },
    /** パターン削除ボタン押下処理 */
    onClickDeletePattern (item) {
      let patternId = JSON.parse(JSON.stringify(item.patternId));
      var newAttendancePatternList = this.attendancePatternList.filter(
        item => item.patternId !== patternId
      )
      // パターンIDを採番しなおします。
      for(var i in newAttendancePatternList){
        newAttendancePatternList[i].patternId = parseInt(i)+1;
      }
      this.attendancePatternList = newAttendancePatternList;
    },
    /** 自社設定入力内容保存ボタン押下時の処理です。 */ 
    async onTouchSave () {
      // 基本情報の保存ボタン押下の場合
      if (this.pageContents === 1) {
        // 工種は工種IDだけ渡します。
        let selectworkTypeId = JSON.parse(JSON.stringify(this.ownCompanyData.workTypeIdList))
        let workTypeIdList = selectworkTypeId.map(item => item.workTypeId);
        const param = {
          contractorId: this.contractorId,
          userId: this.userId,
          pageContents: this.pageContents,
          contractorName: this.ownCompanyData.contractorName,
          foundation: this.ownCompanyData.foundation,
          leaderName: this.ownCompanyData.leaderName,
          postNumber1: this.ownCompanyData.postNumber1,
          postNumber2: this.ownCompanyData.postNumber2,
          address: this.ownCompanyData.address,
          telNumber1: this.ownCompanyData.telNumber1,
          telNumber2: this.ownCompanyData.telNumber2,
          telNumber3: this.ownCompanyData.telNumber3,
          workTypeIdList: workTypeIdList,
          
        }
        try {
          let response = await Methods.saveOwnCompanyInfo(param)
          // レスポンスから画面情報をセットする
          this.ownCompanyData = this.createOwnCompanyData(response);
          this.workTypePullDown = this.createWorkTypePullDown(response);
          // 保存完了メッセージ表示
          this.$emit('alertMethod', response)
        }catch (err){
          let response = err.response;
          // エラーメッセージ表示
          this.$emit('alertMethod', response)
        }
      // 勤怠情報の保存ボタン押下の場合
      } else {
        const param = {
          contractorId: this.contractorId,
          userId: this.userId,
          pageContents: this.pageContents,
          attendancePatternList: this.attendancePatternList,
          tardyTime: this.ownCompanyData.tardyTime,
          roundingTime: this.ownCompanyData.roundingTime,
          selectRoundingTime: this.ownCompanyData.selectRoundingTime,
          updownSelect: this.ownCompanyData.updownSelect,
        }
        try {
          let response = await Methods.saveOwnCompanyInfo(param)
          // レスポンスから画面情報をセットする
          this.ownCompanyData = this.createOwnCompanyData(response);
          this.workTypePullDown = this.createWorkTypePullDown(response);
          // 保存完了メッセージ表示
          this.$emit('alertMethod', response)
        }catch (err){
          let response = err.response;
          // エラーメッセージ表示
          this.$emit('alertMethod', response)
        }
      }
    },
    /** レスポンスをもとに画面情報(自社設定)を作成します。 */
    createOwnCompanyData (response) {
      var ownCompanyResponse = response.data.ownCompanyResponse
      var workTypeResponse = response.data.workTypeResponse
      // 自社員一覧表示用に変換します。
      var ownCompanyData = {}
      ownCompanyData.contractorName = ownCompanyResponse.contractorName
      ownCompanyData.foundation = ownCompanyResponse.foundation
      ownCompanyData.leaderName = ownCompanyResponse.leaderName
      ownCompanyData.postNumber1 = ownCompanyResponse.postNumber1
      ownCompanyData.postNumber2 = ownCompanyResponse.postNumber2
      ownCompanyData.address = ownCompanyResponse.address
      ownCompanyData.telNumber1 = ownCompanyResponse.telNumber1
      ownCompanyData.telNumber2 = ownCompanyResponse.telNumber2
      ownCompanyData.telNumber3 = ownCompanyResponse.telNumber3
      var workTypeIdList = [];
      for(var i = 0; i < ownCompanyResponse.workTypeIdList.length;i++){
        var selectWorkType = {};
        selectWorkType.workTypeName = this.getWorkTypeName(ownCompanyResponse.workTypeIdList[i], workTypeResponse);
        selectWorkType.workTypeId = ownCompanyResponse.workTypeIdList[i];
        workTypeIdList.push(selectWorkType);
      }
      ownCompanyData.workTypeIdList = workTypeIdList;
      ownCompanyData.normalWorkStartHours = ownCompanyResponse.normalWorkStartTime.split(":")[0];
      ownCompanyData.normalWorkStartMinutes = ownCompanyResponse.normalWorkStartTime.split(":")[1];
      ownCompanyData.normalWorkFinishHours = ownCompanyResponse.normalWorkFinishTime.split(":")[0];
      ownCompanyData.normalWorkFinishMinutes = ownCompanyResponse.normalWorkFinishTime.split(":")[1];
      ownCompanyData.exceptionWorkStartHours = ownCompanyResponse.exceptionWorkStartTime.split(":")[0];
      ownCompanyData.exceptionWorkStartMinutes = ownCompanyResponse.exceptionWorkStartTime.split(":")[1];
      ownCompanyData.exceptionWorkFinishHours = ownCompanyResponse.exceptionWorkFinishTime.split(":")[0];
      ownCompanyData.exceptionWorkFinishMinutes = ownCompanyResponse.exceptionWorkFinishTime.split(":")[1];
      ownCompanyData.tardyTime = ownCompanyResponse.tardyTime
      ownCompanyData.roundingTime = ownCompanyResponse.roundingTime
      ownCompanyData.selectRoundingTime = ownCompanyResponse.selectRoundingTime
      ownCompanyData.updownSelect = ownCompanyResponse.updownSelect
      return ownCompanyData;
    },
    /** 工種IDをもとに工種名を取得します。 */
    getWorkTypeName(workTypeId, workTypeResponse) {
      var worlTypeName = "";
      for (var i = 0; i < workTypeResponse.length; i++) {
        if (workTypeId === workTypeResponse[i].workTypeId) {
          worlTypeName = workTypeResponse[i].workTypeName;
        }
      }
      return worlTypeName;
    },
    /** レスポンスをもとに画面情報(工種セレクトボックス)を作成します。 */
    createWorkTypePullDown (response) {
      var workTypeResponse = response.data.workTypeResponse
      var subCompanyPullDown = []
      for (var j = 0; j < workTypeResponse.length; j++) {
        var workType = {}
        workType.workTypeId = workTypeResponse[j].workTypeId
        workType.workTypeName = workTypeResponse[j].workTypeName
        subCompanyPullDown.push(workType)
      }
      return subCompanyPullDown
    }
  }
}
</script>
<style scoped>
.item-label {
  text-align: left;
}
.page-contents-title {
  font-weight: 600;
}

.to-label {
  line-height: 80px;
}
.btn-add-pattern {
  padding-left: 10%;
  padding-top: 5%;
}
.v-text-field--inputTime {
  max-width: 50px;
}
.pattern-table {
  margin-bottom: 2%;
}
.table-input {
  padding-top: 5px;
  height: 50px;
}
</style>
