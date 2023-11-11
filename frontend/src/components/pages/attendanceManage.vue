<template>
  <v-app id="attendanceManage">
    <v-main>
      <v-container>
        <v-sheet color="white" rounded outlined>
          <v-row align="center">
            <!-- 日付選択（※フィルター動作未実装） -->
            <v-col cols="12" sm="4" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="displayDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="displayDateFormat"
                    label="日付を選択"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="displayDate"
                  no-title
                  scrollable
                  locale="jp-ja"
                  :day-format="displayDate => new Date(displayDate).getDate()"
                >
                  <v-btn
                    color="#ff6669"
                    class="white--text"
                    rounded
                    @click="
                      $refs.menu.save(displayDate),
                        findAttendanceListAsync(displayDate)
                    "
                  >
                    OK
                  </v-btn>
                  <v-btn class="#f5f5f5" rounded @click="menu = false">
                    キャンセル
                  </v-btn>
                </v-date-picker>
              </v-menu>
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
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4" style="text-align: right;">
              <!-- ダウンロード形式選択 -->
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" outlined elevation="3">
                    ダウンロード
                    <v-icon color="#00ffd0">mdi-download</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="download('myCompanyAll')">
                    <v-list-item-title>自社用個人別一覧</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="download('anotherCompany')">
                    <v-list-item-title>所属会社別</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="download('anotherJob')">
                    <v-list-item-title>Job別</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="download('anotherdClient')">
                    <v-list-item-title>客先別</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <div>
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              item-key="attendanceId"
              :headers="headers"
              :items="attendanceList"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="-1"
              class="elevation-1"
            >
              <!-- status Row -->
              <template v-slot:[`item.status`]="{ item, index }">
                <v-edit-dialog
                  :return-value.sync="item.status"
                  save-text="保存"
                  cancel-text="キャンセル"
                  large
                  @save="
                    updateAttendanceListAsync(
                      item.employeeId,
                      'status',
                      item.status,
                      index
                    )
                  "
                >
                  <v-chip :color="getColor(toStringStatus(item.status))" dark>
                    {{ toStringStatus(item.status) }}
                  </v-chip>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">ステータスを変更</div>
                    <v-select
                      v-model="item.status"
                      :items="statusItems"
                      outlined
                      autofocus
                      class="mt-5"
                    />
                  </template>
                </v-edit-dialog>
              </template>

              <!-- workFieldDetail Row -->
              <template v-slot:[`item.workFieldDetail`]="{ item }">
                <v-btn
                  outlined
                  @click="fieldContents(item.workFieldDetail, item.employeeId)"
                >
                  {{ item.workFieldDetail.jobNo }}
                </v-btn>
              </template>

              <!-- contract Row -->
              <template v-slot:[`item.contractStatus`]="{ item }">
                <v-chip>
                  {{ toStringContractStatus(item.contractStatus) }}
                </v-chip>
              </template>

              <!-- startTime Row -->
              <template v-slot:[`item.start`]="{ item, index }">
                <v-edit-dialog
                  :return-value.sync="item.start"
                  save-text="保存"
                  cancel-text="キャンセル"
                  large
                  @open="
                    attendanceTimehh = formatTimeHour(item.start);
                    attendanceTimemm = formatTimeMinute(item.start);
                  "
                  @save="
                    (item.start = toDateInputTime(
                      item.start,
                      [attendanceTimehh, attendanceTimemm],
                      'start'
                    )),
                      updateAttendanceListAsync(
                        item.employeeId,
                        'start',
                        item.start,
                        index
                      )
                  "
                >
                  <v-chip label outlined>{{ formatTime(item.start) }} </v-chip>
                  <template v-slot:input>
                    <v-row justify="center" class="align-center">
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimehh"
                          maxlength="2"
                          dense
                        /> </v-col
                      >:
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimemm"
                          maxlength="2"
                          dense
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- restStart Row -->
              <template v-slot:[`item.restStart`]="{ item, index }">
                <v-edit-dialog
                  :return-value.sync="item.restStart"
                  save-text="保存"
                  cancel-text="キャンセル"
                  large
                  @open="
                    attendanceTimehh = formatTimeHour(item.restStart);
                    attendanceTimemm = formatTimeMinute(item.restStart);
                  "
                  @save="
                    (item.restStart = toDateInputTime(
                      item.restStart,
                      [attendanceTimehh, attendanceTimemm],
                      'restStart'
                    )),
                      updateAttendanceListAsync(
                        item.employeeId,
                        'restStart',
                        item.restStart,
                        index
                      )
                  "
                >
                  <v-chip label outlined
                    >{{ formatTime(item.restStart) }}
                  </v-chip>
                  <template v-slot:input>
                    <v-row justify="center" class="align-center">
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimehh"
                          maxlength="2"
                          dense
                        /> </v-col
                      >:
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimemm"
                          maxlength="2"
                          dense
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- restEnd Row -->
              <template v-slot:[`item.restEnd`]="{ item, index }">
                <v-edit-dialog
                  :return-value.sync="item.restEnd"
                  save-text="保存"
                  cancel-text="キャンセル"
                  large
                  @open="
                    attendanceTimehh = formatTimeHour(item.restEnd);
                    attendanceTimemm = formatTimeMinute(item.restEnd);
                  "
                  @save="
                    (item.restEnd = toDateInputTime(
                      item.restEnd,
                      [attendanceTimehh, attendanceTimemm],
                      'restEnd'
                    )),
                      updateAttendanceListAsync(
                        item.employeeId,
                        'restEnd',
                        item.restEnd,
                        index
                      )
                  "
                >
                  <v-chip label outlined
                    >{{ formatTime(item.restEnd) }}
                  </v-chip>
                  <template v-slot:input>
                    <v-row justify="center" class="align-center">
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimehh"
                          maxlength="2"
                          dense
                        /> </v-col
                      >:
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimemm"
                          maxlength="2"
                          dense
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- end Row -->
              <template v-slot:[`item.end`]="{ item, index }">
                <v-edit-dialog
                  :return-value.sync="item.end"
                  save-text="保存"
                  cancel-text="キャンセル"
                  large
                  @open="
                    attendanceTimehh = formatTimeHour(item.end);
                    attendanceTimemm = formatTimeMinute(item.end);
                  "
                  @save="
                    (item.end = toDateInputTime(
                      item.end,
                      [attendanceTimehh, attendanceTimemm],
                      'end'
                    )),
                      updateAttendanceListAsync(
                        item.employeeId,
                        'end',
                        item.end,
                        index
                      )
                  "
                >
                  <v-chip label outlined>{{ formatTime(item.end) }} </v-chip>
                  <template v-slot:input>
                    <v-row justify="center" class="align-center">
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimehh"
                          maxlength="2"
                          dense
                        /> </v-col
                      >:
                      <v-col cols="5">
                        <v-text-field
                          class="v-text-field--inputTime"
                          type="text"
                          v-model="attendanceTimemm"
                          maxlength="2"
                          dense
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- overTimeRow -->
              <template v-slot:[`item.overTime`]="{ item }">
                {{ displayOverTime(item.start, item.end) }}
              </template>

              <!-- midNightTimeRow -->
              <template v-slot:[`item.midNightTime`]="{ item }">
                {{ displayMidNightTime(item.end) }}
              </template>

              <!-- noteContents Row -->
              <template v-slot:[`item.note`]="{ item, index }">
                <v-edit-dialog
                  :return-value.sync="item.noteContents"
                  save-text="保存"
                  cancel-text="キャンセル"
                  large
                  @save="
                    updateAttendanceListAsync(
                      item.employeeId,
                      'noteContents',
                      item.noteContents,
                      index
                    )
                  "
                >
                  <v-btn outlined>
                    {{ isNoteContents(item.noteContents) }}
                  </v-btn>
                  <template v-slot:input>
                    <v-card flat>
                      <v-card-title class="text-h5 grey lighten-2">
                        備考欄
                      </v-card-title>
                      <v-card-text class="mt-5">
                        <v-textarea
                          v-model="item.noteContents"
                          outlined
                          name="input-7-4"
                          value="detailEdit.noteContents"
                        ></v-textarea>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
        <!--fieldDialog-->
        <v-dialog v-model="fieldDialog" max-width="300">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2 mb-5">
              現場詳細表示
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4" md="4" align="right">
                  <h4>jobNo:</h4>
                </v-col>
                <v-col cols="12" sm="8" md="8" align="left">
                  <h4>{{ detailEdit.jobNo }}</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4" align="right">
                  <h4>客先:</h4>
                </v-col>
                <v-col cols="12" sm="8" md="8" align="left">
                  <h4>{{ detailEdit.clientFieldName }}</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4" align="right">
                  <h4>現場名:</h4>
                </v-col>
                <v-col cols="12" sm="8" md="8" align="left">
                  <h4>{{ detailEdit.workFieldName }}</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4" align="right">
                  <h4>工事件名:</h4>
                </v-col>
                <v-col cols="12" sm="8" md="8" align="left">
                  <h4>
                    {{ detailEdit.workFieldDetailName }}
                  </h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="closeFieldContent()" class="#f5f5f5" rounded
                >閉じる</v-btn
              >
              <v-btn
                @click="showFieldEditDialog()"
                color="#ff6669"
                elevation="3"
                outlined
                rounded
              >
                編集
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="fieldEditDialog"
          :value="detailEdit"
          max-width="600px"
          persistent
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              現場詳細編集
            </v-card-title>
            <v-card-text>
              <v-container
                ><v-tabs v-model="fieldEditTab" grow>
                  <v-tab>
                    jobNoを入力
                  </v-tab>
                  <v-tab>
                    客先から選択
                  </v-tab>
                  <v-tab-item>
                    <v-card flat>
                      <v-row class="ma-4">
                        <v-col md="3">
                          <p>jobNo</p>
                        </v-col>
                        <v-col md="3">
                          <v-chip color="red" dark>必須</v-chip>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="detailEdit.jobNo"
                            placeholder="例）21-0001"
                            maxlength="7"
                            clearable
                            clear-icon="mdi-close-circle"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row>
                          <v-col md="3">
                            <p>客先名</p>
                          </v-col>
                          <v-col md="3">
                            <v-chip color="red" dark>必須</v-chip>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="detailEdit.selectClientField"
                              v-on:change="selectCleintField"
                              label="(例)株式会社ABC"
                              :items="clientFieldList"
                              item-text="clientFieldName"
                              item-value="value"
                              return-object
                              outlined
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="3">
                            <p>現場名</p>
                          </v-col>
                          <v-col md="3">
                            <v-chip color="red" dark>必須</v-chip>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="detailEdit.selectWorkField"
                              label="(例)株式会社ABC"
                              v-on:change="selectWorkField"
                              :items="workFieldList"
                              item-text="workFieldName"
                              item-value="value"
                              return-object
                              outlined
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="3">
                            <p>工事件名</p>
                          </v-col>
                          <v-col md="3">
                            <v-chip color="red" dark>必須</v-chip>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="detailEdit.selectWorkFieldDetail"
                              label="(例)株式会社ABC"
                              :items="workFieldDetailList"
                              item-text="workFieldDetailName"
                              item-value="value"
                              return-object
                              outlined
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="closeFieldEditDialog()" class="#f5f5f5" rounded>
                キャンセル
              </v-btn>
              <v-btn
                color="#ff6669"
                class="white--text"
                rounded
                @click="saveFieldDetail()"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Methods from "@/api/methods";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export default {
  name: "attendanceManage",
  components: {},
  data: () => ({
    // TODO ログイン認証処理が完了したら、画面で持ってるemployeeIDをセットする
    userId: "6tQPHzHQwlGErXeLSzt1",
    // ※現在(2022/03/01)は、契約が一社のため、固定でIDを設定
    // ※複数社契約になった場合、セッションで契約IDを保持して、
    // ※そのIDをもとに検索するように修正
    contractorId: "00000001",
    contractorInfo: {},
    clientFieldList: [],
    workFieldList: [],
    workFieldDetailList: [],
    workFieldResponse: {},
    workFieldDetailResrponse: {},
    roundingTime: 0,
    search: "",
    status: "",
    menu: false,
    displayDate: "",
    specifiedDateRangeTo: "",
    specifiedDateRangeFrom: "",
    statusItems: [
      { text: "出勤中", value: "0" },
      { text: "休憩中", value: "1" },
      { text: "退勤中", value: "2" },
      { text: "残業中", value: "3" },
      { text: "早退", value: "4" },
      { text: "早出", value: "5" },
      { text: "遅出", value: "6" },
      { text: "深夜", value: "7" },
      { text: "欠勤", value: "8" }
    ],
    contractItems: [
      { text: "請負", value: 0 },
      { text: "常用", value: 1 }
    ],
    editObjectId: "",
    detailEdit: {},
    noteContentsDialog: false,
    fieldDialog: false,
    fieldEditDialog: false,
    fieldEditTab: 0,
    attendanceList: [],
    attendanceTimehh: "",
    attendanceTimemm: ""
  }),
  mounted: async function() {
    // 出退勤管理の画面情報をとってきます。
    this.getAttendanceInfo();
  },
  computed: {
    /** v-tableのヘッダーを設定 */
    headers() {
      return [
        {
          text: "氏名",
          align: "center",
          sortable: false,
          value: "userName"
        },
        {
          text: "勤怠ステータス",
          value: "status",
          align: "center",
          filter: value => {
            if (!this.status) return true;

            return value < parseInt(this.status);
          }
        },
        {
          text: "現場名",
          value: "workFieldDetail",
          align: "center"
        },
        {
          text: "契約",
          value: "contractStatus",
          sortable: false,
          align: "center"
        },
        { text: "開始", value: "start", sortable: false, align: "center" },
        { text: "休憩", value: "restStart", sortable: false, align: "center" },
        { text: "戻り", value: "restEnd", sortable: false, align: "center" },
        { text: "終了", value: "end", sortable: false, align: "center" },
        { text: "時間外", value: "overTime", sortable: false, align: "center" },
        {
          text: "深夜",
          value: "midNightTime",
          sortable: false,
          align: "center"
        },
        { text: "備考", value: "note", sortable: false, align: "center" }
      ];
    },
    // 日付を「YYYY/MM/DD」表記にします。
    displayDateFormat() {
      return dayjs(this.displayDate).format("YYYY/MM/DD");
    }
  },
  methods: {
    /** 初期表示処理 */
    async getAttendanceInfo() {
      // this.displayDate = dayjs(new Date()).format("YYYY-MM-DD");
      this.displayDate = dayjs("2022-07-01").format("YYYY-MM-DD");
      await this.findAttendanceListAsync(this.displayDate);
    },
    async findAttendanceListAsync(displayDate) {
      // タイムゾーン（+09:00）を減算
      this.specifiedDateRangeOfStart = [
        dayjs(displayDate)
          .startOf("day")
          .subtract(9, "h")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        dayjs(displayDate)
          .endOf("day")
          .subtract(9, "h")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      ];
      this.specifiedDateRangeOfEnd = [
        dayjs(displayDate)
          .startOf("day")
          .subtract(9, "h")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        dayjs(displayDate)
          .add(1, "day")
          .endOf("day")
          .subtract(9, "h")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      ];
      let response = await Methods.findAttendanceListAsync(
        this.contractorId,
        this.specifiedDateRangeOfStart,
        this.specifiedDateRangeOfEnd
      );
      // レスポンスから画面情報をセットする
      this.attendanceList = response.data.attendanceManageResponse;
      this.contractorInfo = response.data.contractorResponse;
      this.roundingTime = this.convertRoundingTime();
      this.clientFieldList = this.createClientFieldList(response);
      this.workFieldResponse = response.data.workFieldResponse;
      this.workFieldDetailResponse = response.data.workFieldDetailResponse;
    },
    async updateAttendanceListAsync(employeeId, clumns, items, index) {
      if (this.attendanceList.length < 0) {
        this.attendanceList = await this.findAttendanceListAsync(
          this.displayDate
        );
      }
      try {
        let response = await Methods.updateAttendanceListAsync(
          this.contractorId,
          employeeId,
          clumns,
          items
        );
        // レスポンスから画面情報をセットする
        this.attendanceList = response.data.attendanceManageResponse;
        this.contractorInfo = response.data.contractorResponse;
        this.roundingTime = this.convertRoundingTime();
        this.clientFieldList = this.createClientFieldList(response);
        this.workFieldResponse = response.data.workFieldResponse;
        this.workFieldDetailResponse = response.data.workFieldDetailResponse;
        // 保存完了メッセージ表示
        this.$emit("alertMethod", response);
      } catch (err) {
        let response = err.response;
        // エラーメッセージ表示
        this.$emit("alertMethod", response);
      }
    },
    /** ダウンロード処理 */
    download(format) {
      // TODO ダウンロード処理
    },
    /** 検索処理 */
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search) !== -1
      );
    },
    /** ステータス変換処理 */
    toStringStatus(statusCode) {
      switch (statusCode) {
        case "0":
          return "出勤中";
        case "1":
          return "休憩中";
        case "2":
          return "退勤中";
        case "3":
          return "残業中";
        case "4":
          return "早退";
        case "5":
          return "早出";
        case "6":
          return "遅出";
        case "7":
          return "深夜";
        case "8":
          return "欠勤";
      }
    },
    /** ステータスカラーの変更処理 */
    getColor(status) {
      if (status === "出勤中") return "green";
      else if (status === "休憩中") return "orange";
      else return "red";
    },
    /** 契約表示処理 */
    toStringContractStatus(statusCode) {
      switch (statusCode) {
        case "0":
          return "請負";
        case "1":
          return "常用";
      }
    },
    /** 表示する時間を処理 */
    formatTime(date) {
      // 未入力の場合、ハイフンで表示する
      if (date === "") {
        return "--:--";
      }
      return date;
    },
    /** 時間詳細ダイアログ（時）表示処理 */
    formatTimeHour(date) {
      return date.split(":")[0];
      // return dayjs(date).format("HH");
    },
    /** 時間詳細ダイアログ（分）表示処理 */
    formatTimeMinute(date) {
      return date.split(":")[1];
      // return dayjs(date).format("mm");
    },
    /** 時間詳細ダイアログ保存ボタン押下処理 */
    toDateInputTime(targetDate, toDate) {
      return toDate[0] + ":" + toDate[1];
      // // toDate[0]-9 は日本時間+9:00がつくことを前提にあらかじめマイナスする
      // // 型を成形 YYYY-MM-DDTHH:mm:ss.SSSZ
      // return dayjs(targetDate)
      //   .hour(toDate[0] - 9)
      //   .minute(toDate[1])
      //   .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    },
    /** 時間に0埋め処理 */
    zeroPaddingTime(hour) {
      return ("00" + hour).slice(-2);
    },
    /** 時間外表示処理 */
    displayOverTime(startTime, endTime) {
      // 業務開始時間または終了時間が未入力の場合
      if (startTime === "" || endTime === "") {
        return "--:--";
      }
      // 自社設定から取得したデータを格納します。
      var updownSelect = this.contractorInfo.updownSelect;
      var normalWorkStartTime = this.contractorInfo.normalWorkStartTime;
      // var normalWorkFinishTime = this.contractorInfo.normalWorkFinishTime;
      var exceptionWorkStartTime = this.contractorInfo.exceptionWorkStartTime;
      // var exceptionWorkFinishTime = this.contractorInfo.nexceptionWorkFinishTime;

      // 通常業務終了時間
      var contractorEndTime = this.contractorInfo.normalWorkFinishTime.split(
        ":"
      );
      const fromOverTime = dayjs(this.displayDate)
        .hour(contractorEndTime[0])
        .minute(contractorEndTime[1]);

      // 業務開始入力時間
      var startTWorkTime = startTime.split(":");
      const targetStartTime = dayjs(this.displayDate)
        .hour(startTWorkTime[0])
        .minute(startTWorkTime[1]);

      // 業務終了入力時間
      var endTWorkTime = endTime.split(":");
      const targetEndTime = dayjs(this.displayDate)
        .hour(endTWorkTime[0])
        .minute(endTWorkTime[1]);
      // .second(0);

      const toEaryTimeRange = dayjs(this.displayDate).minute(
        normalWorkStartTime.split(":")[1]
      );

      // 深夜時間の範囲
      const fromMidNightTimeRange = dayjs(this.displayDate)
        .hour(exceptionWorkStartTime.split(":")[0])
        .minute(exceptionWorkStartTime.split(":")[1]);

      // const toMidNightTimeRange = dayjs(this.displayDate)
      //   .add(1, "day")
      //   .hour(5)
      //   .minute(0)
      //
      // 業務の次の日の時間外時間の範囲
      const fromEaryOverTimeRange = dayjs(this.displayDate)
        .add(1, "day")
        .hour(5);

      const toEaryOverTimeRange = dayjs(this.displayDate)
        .add(1, "day")
        .hour(normalWorkStartTime.split(":")[0])
        .minute(normalWorkStartTime.split(":")[1]);

      // 表示する時間外
      let displayHour = 0;
      let displayMinute = 0;
      // 業務終了後の時間外時間
      let subtractionHour = 0;
      let subtractionMinute = 0;
      // 早出時間
      let subtractionTodayEaryHour = 0;
      let subtractionTodayEaryMinute = 0;
      // 深夜時間
      // let subtractionMidNightHour = 0;
      // let subtractionMidNightMinute = 0;
      // 業務の次の日の時間外時間
      let subtractionNextdayEaryHour = 0;
      let subtractionNextdayEaryMinute = 0;

      // const totalAttendanceHour = targetEndTime.diff(targetStartTime, "hour");
      // const totalAttendanceMinute =
      //   targetEndTime.diff(targetStartTime, "minute") % 60;

      // 早出：当日
      // 開始時間が5時から自社設定で決められた開始時間までの間の場合
      if (
        fromEaryTimeRange < targetStartTime &&
        toEaryTimeRange > targetStartTime
      ) {
        // dayjsの関数で開始時間と早出時間との差分を計算します。
        subtractionTodayEaryHour = toEaryTimeRange.diff(
          targetStartTime,
          "hour"
        );
        subtractionTodayEaryMinute = -(
          targetStartTime.diff(toEaryTimeRange, "minute") % 60
        );
      }
      // 通常：当日
      // 終了時間が自社設定で決められた終了時間を過ぎている場合
      if (fromOverTime < targetEndTime) {
        if (fromMidNightTimeRange < targetEndTime) {
          subtractionHour = targetEndTime.diff(fromOverTime, "hour");
          subtractionMinute = targetEndTime.diff(fromOverTime, "minute") % 60;
        } else {
          // 自社設定より算出した最大通常時間外固定値を入れる
          // (通常業務終了時間から22時までの差分)
          // 業務終了時間が22時以降に設定されている場合、0を設定
          if (fromOverTime.hour() < 22) {
            subtractionHour = 22 - fromOverTime.hour();
          } else {
            subtractionHour = 0;
          }
        }
      }

      // 深夜
      // TODO 丸め設定を入れる（切り捨て）
      // if (fromMidNightTimeRange < targetEndTime) {
      //   if (toMidNightTimeRange > targetEndTime) {
      //     subtractionMidNightHour = targetEndTime.diff(
      //       fromMidNightTimeRange,
      //       "hour"
      //     );
      //     subtractionMidNightMinute =
      //       targetEndTime.diff(fromMidNightTimeRange, "minute") % 60;
      //   } else {
      //     subtractionMidNightHour = 7;
      //   }
      // }
      // 早出：翌日
      if (
        fromEaryOverTimeRange < targetEndTime &&
        targetEndTime < toEaryOverTimeRange
      ) {
        subtractionNextdayEaryHour = targetEndTime.diff(
          fromEaryTimeRange,
          "hour"
        );
        subtractionNextdayEaryMinute = targetEndTime.diff(
          fromEaryTimeRange,
          "minute"
        );
      }

      // 業務終了後の時間外時間 + 業務開始前の時間外時間 + 業務の次の日の時間外時間
      displayHour =
        subtractionHour + subtractionTodayEaryHour + subtractionNextdayEaryHour;

      displayMinute =
        subtractionMinute +
        subtractionTodayEaryMinute +
        subtractionNextdayEaryMinute;

      // 丸め設定をします。
      var roundingDisplayMinute = displayMinute % this.roundingTime;
      // 丸め時間で割り、0の場合なにもしません。
      if (roundingDisplayMinute !== 0) {
        // 切り上げの場合
        if (updownSelect === 0) {
          displayMinute =
            displayMinute - roundingDisplayMinute + this.roundingTime;
          // 切り捨ての場合
        } else {
          displayMinute = displayMinute - roundingDisplayMinute;
        }
      }

      return (
        this.zeroPaddingTime(displayHour) +
        ":" +
        this.zeroPaddingTime(displayMinute)
      );
    },
    /** 深夜時間表示処理 */
    displayMidNightTime(endTime) {
      const fromTimeRange = dayjs(this.displayDate).hour(22);

      const toTimeRange = dayjs(this.displayDate)
        .add(1, "day")
        .hour(5);

      const toTime = dayjs("2022-07-01" + endTime);

      if (fromTimeRange < toTime && toTimeRange > toTime) {
        const overTimeHour = toTime.diff(fromTimeRange, "hour");
        const overTimeMinute = toTime.diff(fromTimeRange, "minutes") % 60;
        return (
          this.zeroPaddingTime(overTimeHour) +
          ":" +
          this.zeroPaddingTime(overTimeMinute)
        );
      }
      return "00:00";
    },
    /** 備考表示処理 */
    isNoteContents(noteContents) {
      if (noteContents.length > 0) {
        return "あり";
      } else return "なし";
    },
    // /** データ変更処理 */
    // async setItem(item) {
    //   console.log(item);
    // },
    /** 現場詳細押下処理 */
    fieldContents(item, employeeId) {
      // observerのためにわざわざこの書き方するよ
      this.detailEdit = {
        employeeId: employeeId,
        jobNo: item.jobNo,
        selectClientField: item.selectClientField,
        selectWorkField: item.selectWorkField,
        selectWorkFieldDetail: item.selectWorkFieldDetail,
        clientFieldName: item.clientFieldName,
        workFieldName: item.workFieldName,
        workFieldDetailName: item.workFieldDetailName
      };
      this.fieldDialog = true;
    },
    /** 現場詳細ダイアログ（編集前）閉じるボタン押下処理 */
    closeFieldContent() {
      this.fieldDialog = false;
    },
    /** 現場詳細ダイアログ（編集前）編集ボタン押下処理 */
    showFieldEditDialog() {
      this.closeFieldContent();
      // 現場セレクトボックスを作成します。
      this.workFieldList = this.createWorkFieldLiist();
      // 現場詳細セレクトボックスを作成します。
      this.workFieldDetailList = this.createWorkFieldDetailLiist();
      this.fieldEditDialog = true;
    },
    /** 現場詳細ダイアログ（編集時）OKボタン押下処理 */
    async saveFieldDetail() {
      // 現場詳細IDだけ渡します。
      var workFieldDetailId = "";
      if (this.detailEdit.selectWorkFieldDetail != null) {
        let selectWorkFieldDetail = JSON.parse(
          JSON.stringify(this.detailEdit.selectWorkFieldDetail)
        );
        workFieldDetailId = selectWorkFieldDetail.workFieldDetailId;
      }
      try {
        let response = await Methods.updateJobNo(
          this.contractorId,
          this.detailEdit.employeeId,
          this.fieldEditTab,
          this.detailEdit.jobNo,
          workFieldDetailId
        );
        // レスポンスから画面情報をセットする
        this.attendanceList = response.data.attendanceManageResponse;
        this.contractorInfo = response.data.contractorResponse;
        this.roundingTime = this.convertRoundingTime();
        this.clientFieldList = this.createClientFieldList(response);
        this.workFieldResponse = response.data.workFieldResponse;
        this.workFieldDetailResponse = response.data.workFieldDetailResponse;
        this.fieldEditDialog = false;
        // 保存完了メッセージ表示
        this.$emit("alertMethod", response);
      } catch (err) {
        let response = err.response;
        // エラーメッセージ表示
        this.$emit("alertMethod", response);
      }
    },
    /** 現場詳細ダイアログ（編集時）キャンセルボタン押下処理 */
    closeFieldEditDialog() {
      // 編集前の情報に戻します。
      this.detailEdit = {};
      this.fieldEditDialog = false;
    },
    /** 客先名セレクトボックス作成処理 */
    createClientFieldList(response) {
      var clientFieldResponse = response.data.clientFieldResponse;
      var clientFieldList = [];
      for (var j = 0; j < clientFieldResponse.length; j++) {
        var clientField = {};
        clientField.clientFieldId = clientFieldResponse[j].clientFieldId;
        clientField.clientFieldName = clientFieldResponse[j].clientFieldName;
        clientFieldList.push(clientField);
      }
      return clientFieldList;
    },
    /** 現場セレクトボックス作成処理 */
    createWorkFieldLiist() {
      var workFieldList = [];
      var clientFieldId = "";
      // 工種は工種IDだけ渡します。
      if (this.detailEdit.selectClientField != null) {
        let selectClientField = JSON.parse(
          JSON.stringify(this.detailEdit.selectClientField)
        );
        clientFieldId = selectClientField.clientFieldId;
      }
      for (var i = 0; i < this.workFieldResponse.length; i++) {
        // 選択した客先に紐づく現場のみ表示します。
        if (clientFieldId === this.workFieldResponse[i].clientFieldId) {
          var workField = {};
          workField.workFieldId = this.workFieldResponse[i].workFieldId;
          workField.workFieldName = this.workFieldResponse[i].workFieldName;
          workFieldList.push(workField);
        }
      }
      return workFieldList;
    },
    /** 現場詳細セレクトボックス作成処理 */
    createWorkFieldDetailLiist() {
      var workFieldDetailList = [];
      var workFieldId = "";
      // 工種は工種IDだけ渡します。
      if (this.detailEdit.selectWorkField != null) {
        let selectWorkField = JSON.parse(
          JSON.stringify(this.detailEdit.selectWorkField)
        );
        workFieldId = selectWorkField.workFieldId;
      }
      for (var i = 0; i < this.workFieldDetailResponse.length; i++) {
        // 選択した客先に紐づく現場のみ表示します。
        if (workFieldId === this.workFieldDetailResponse[i].workFieldId) {
          var workFieldDetail = {};
          workFieldDetail.workFieldDetailId = this.workFieldDetailResponse[
            i
          ].workFieldDetailId;
          workFieldDetail.workFieldDetailName = this.workFieldDetailResponse[
            i
          ].workFieldDetailName;
          workFieldDetailList.push(workFieldDetail);
        }
      }
      return workFieldDetailList;
    },
    /** 客先セレクトボックス押下処理 */
    selectCleintField() {
      // 現場セレクトボックスを作成します。
      this.workFieldList = this.createWorkFieldLiist();
      this.detailEdit = {
        employeeId: this.detailEdit.employeeId,
        jobNo: "",
        selectClientField: this.detailEdit.selectClientField,
        selectWorkField: "",
        selectWorkFieldDetail: "",
        clientFieldName: this.detailEdit.clientFieldName,
        workFieldName: "",
        workFieldDetailName: ""
      };
    },
    /** 現場セレクトボックス押下処理 */
    selectWorkField() {
      // 現場詳細セレクトボックスを作成します。
      this.workFieldDetailList = this.createWorkFieldDetailLiist();
      this.detailEdit = {
        employeeId: this.detailEdit.employeeId,
        jobNo: "",
        selectClientField: this.detailEdit.selectClientField,
        selectWorkField: this.detailEdit.selectWorkField,
        selectWorkFieldDetail: "",
        clientFieldName: this.detailEdit.clientFieldName,
        workFieldName: this.detailEdit.workFieldName,
        workFieldDetailName: ""
      };
    },
    /** 丸み時間を設定 */
    convertRoundingTime() {
      // 15分指定
      if (this.contractorInfo.roundingTime === "0") {
        return 15;
        // 30分指定
      } else if (this.contractorInfo.roundingTime === "1") {
        return 30;
        // 分指定
      } else {
        return this.contractorInfo.selectRoundingTime;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field--inputTime {
  max-width: 50px;
}
</style>
