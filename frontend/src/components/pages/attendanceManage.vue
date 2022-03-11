<template>
  <v-app id="attendanceManage">
    <v-main>
      <v-container>
        <v-sheet color="white" rounded outlined>
          <v-row align="center">
            <!-- 日付選択（※フィルター動作未実装） -->
            <v-col cols="12" sm="4" md="2">
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
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- ダウンロード形式選択 -->
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" outlined elevation="3"
                    >ダウンロード<v-icon color="#00ffd0"
                      >mdi-download</v-icon
                    ></v-btn
                  >
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
              item-key="objectId"
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
                      item.objectId,
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
              <template v-slot:[`item.workFieldDetail`]="{ item, index }">
                <v-btn outlined @click="fieldContents(item.workFieldDetail)">
                  {{ item.workFieldDetail.jobNo }}
                </v-btn>
              </template>

              <!-- contract Row -->
              <template v-slot:[`item.contractStatus`]="{ item }">
                <v-chip>
                  {{
                    toStringContractStatus(item.workFieldDetail.contractStatus)
                  }}
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
                    (item.start.iso = toDateInputTime(
                      item.start,
                      [attendanceTimehh, attendanceTimemm],
                      'start'
                    )),
                      updateAttendanceListAsync(
                        item.objectId,
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
                    (item.restStart.iso = toDateInputTime(
                      item.restStart,
                      [attendanceTimehh, attendanceTimemm],
                      'restStart'
                    )),
                      updateAttendanceListAsync(
                        item.objectId,
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
                    (item.restEnd.iso = toDateInputTime(
                      item.restEnd,
                      [attendanceTimehh, attendanceTimemm],
                      'restEnd'
                    )),
                      updateAttendanceListAsync(
                        item.objectId,
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
                    (item.end.iso = toDateInputTime(
                      item.end,
                      [attendanceTimehh, attendanceTimemm],
                      'end'
                    )),
                      updateAttendanceListAsync(
                        item.objectId,
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
                {{ displayOverTime(item.end, item.start) }}
              </template>

              <!-- midNightTimeRow -->
              <template v-slot:[`item.midNightTime`]="{ item }">
                {{ displayMidNightTime(item.end, item.start) }}
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
                      item.objectId,
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
                  <h4>{{ detailEdit.workName }}</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4" align="right">
                  <h4>工事件名:</h4>
                </v-col>
                <v-col cols="12" sm="8" md="8" align="left">
                  <h4>
                    {{ detailEdit.workFieldName }}
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

        <v-dialog v-model="fieldEditDialog" max-width="600px" persistent>
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
                              label="(例)株式会社ABC"
                              :items="[
                                '株式会社A',
                                '株式会社B',
                                '株式会社C',
                                '株式会社D'
                              ]"
                              outlined
                              required
                              dense
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
                              label="(例)株式会社ABC"
                              :items="[
                                '株式会社A',
                                '株式会社B',
                                '株式会社C',
                                '株式会社D'
                              ]"
                              outlined
                              required
                              dense
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
                              label="(例)株式会社ABC"
                              :items="[
                                '株式会社A',
                                '株式会社B',
                                '株式会社C',
                                '株式会社D'
                              ]"
                              outlined
                              required
                              dense
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
    search: "",
    status: "",
    menu: false,
    displayDate: "",
    specifiedDateRangeTo: "",
    specifiedDateRangeFrom: "",
    statusItems: [
      { text: "出勤中", value: 0 },
      { text: "休憩中", value: 1 },
      { text: "退勤中", value: 2 },
      { text: "残業中", value: 3 },
      { text: "早退", value: 4 },
      { text: "早出", value: 5 },
      { text: "遅出", value: 6 },
      { text: "深夜", value: 7 },
      { text: "欠勤", value: 8 }
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
    // this.displayDate = dayjs(new Date()).format("YYYY-MM-DD");
    this.displayDate = dayjs("2022-02-27").format("YYYY-MM-DD");
    await this.findAttendanceListAsync(this.displayDate);
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
    displayDateFormat() {
      return dayjs(this.displayDate).format("YYYY/MM/DD");
    }
  },
  methods: {
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
        this.specifiedDateRangeOfStart,
        this.specifiedDateRangeOfEnd
      );
      this.attendanceList = response.data;
    },
    async updateAttendanceListAsync(objectId, clumns, items, index) {
      if (this.attendanceList.length < 0) {
        this.attendanceList = await this.findAttendanceListAsync(
          this.displayDate
        );
      }
      let response = await Methods.updateAttendanceListAsync(
        objectId,
        clumns,
        items
      );
      this.attendanceList[index] = response.data[0];

      // 再描画用インスタンス生成（再描画トリガー）
      this.attendanceList = this.attendanceList.map(items => {
        return items;
      });
    },
    // ページ遷移処理
    download(format) {
      console.log(format);
    },
    // 検索
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
    /** ステータス変換Module */
    toStringStatus(statusCode) {
      switch (statusCode) {
        case 0:
          return "出勤中";
        case 1:
          return "休憩中";
        case 2:
          return "退勤中";
        case 3:
          return "残業中";
        case 4:
          return "早退";
        case 5:
          return "早出";
        case 6:
          return "遅出";
        case 7:
          return "深夜";
        case 8:
          return "欠勤";
      }
    },
    /** ステータスカラーの変更 */
    getColor(status) {
      if (status === "出勤中") return "green";
      else if (status === "休憩中") return "orange";
      else return "red";
    },
    /** 契約変換Module */
    toStringContractStatus(statusCode) {
      switch (statusCode) {
        case 0:
          return "請負";
        case 1:
          return "常用";
      }
    },
    formatTime(date) {
      return dayjs(date.iso).format("HH:mm");
    },
    formatTimeHour(date) {
      return dayjs(date.iso).format("HH");
    },
    formatTimeMinute(date) {
      return dayjs(date.iso).format("mm");
    },
    toDateInputTime(targetDate, toDate) {
      // toDate[0]-9 は日本時間+9:00がつくことを前提にあらかじめマイナスする
      // 型を成形 YYYY-MM-DDTHH:mm:ss.SSSZ
      return dayjs(targetDate.iso)
        .hour(toDate[0] - 9)
        .minute(toDate[1])
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    },
    zeroPaddingTime(hour) {
      return ("00" + hour).slice(-2);
    },
    displayOverTime(endTime, startTime, status) {
      // TODO 自社設定の通常業務終了時間を hour minute に充てる
      const fromOverTime = dayjs(this.displayDate)
        .hour(18)
        .minute(0)
        .second(0);

      // TODO 丸め設定を入れる（切り上げ）
      const targetEndTime = dayjs(endTime.iso);
      const targetStartTime = dayjs(startTime.iso);

      const fromEaryTimeRange = dayjs(this.displayDate)
        .hour(5)
        .minute(0)
        .second(0);
      const toEaryTimeRange = dayjs(this.displayDate)
        .hour(9)
        .minute(0)
        .second(0);

      const fromMidNightTimeRange = dayjs(this.displayDate)
        .hour(22)
        .minute(0)
        .second(0);
      const toMidNightTimeRange = dayjs(this.displayDate)
        .add(1, "day")
        .hour(5)
        .minute(0)
        .second(0);

      const fromEaryOverTimeRange = dayjs(this.displayDate)
        .add(1, "day")
        .hour(5)
        .minute(0)
        .second(0);
      const toEaryOverTimeRange = dayjs(this.displayDate)
        .add(1, "day")
        .hour(9)
        .minute(0)
        .second(0);

      let displayHour = 0;
      let displayMinute = 0;

      let subtractionHour = 0;
      let subtractionMinute = 0;

      let subtractionTodayEaryHour = 0;
      let subtractionTodayEaryMinute = 0;

      let subtractionMidNightHour = 0;
      let subtractionMidNightMinute = 0;

      let subtractionNextdayEaryHour = 0;
      let subtractionNextdayEaryMinute = 0;

      // const totalAttendanceHour = targetEndTime.diff(targetStartTime, "hour");
      // const totalAttendanceMinute =
      //   targetEndTime.diff(targetStartTime, "minute") % 60;

      // 早出：当日
      // TODO 丸め設定を入れる（切り捨て）
      if (
        fromEaryTimeRange < targetStartTime &&
        toEaryTimeRange > targetStartTime
      ) {
        subtractionTodayEaryHour = toEaryTimeRange.diff(
          targetStartTime,
          "hour"
        );
        subtractionTodayEaryMinute = -(
          targetStartTime.diff(toEaryTimeRange, "minute") % 60
        );
      }
      // 通常：当日
      // TODO 丸め設定を入れる（切り捨て）
      if (fromOverTime < targetEndTime) {
        if (fromMidNightTimeRange > targetEndTime) {
          subtractionHour = targetEndTime.diff(fromOverTime, "hour");
          subtractionMinute = targetEndTime.diff(fromOverTime, "minute") % 60;
          // TODO 自社設定より算出した最大通常時間外固定値を入れる (通常業務終了時間から22時までの差分)
        } else {
          subtractionHour = 4;
        }
      }
      // 深夜
      // TODO 丸め設定を入れる（切り捨て）
      if (fromMidNightTimeRange < targetEndTime) {
        if (toMidNightTimeRange > targetEndTime) {
          subtractionMidNightHour = targetEndTime.diff(
            fromMidNightTimeRange,
            "hour"
          );
          subtractionMidNightMinute =
            targetEndTime.diff(fromMidNightTimeRange, "minute") % 60;
        } else {
          subtractionMidNightHour = 7;
        }
      }
      // 早出：翌日
      // TODO 丸め設定を入れる（切り捨て）
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

      // console.log({
      //   total: totalAttendanceHour + ":" + totalAttendanceMinute,
      //   todayEary: subtractionTodayEaryHour + ":" + subtractionTodayEaryMinute,
      //   midnight: subtractionMidNightHour + ":" + subtractionMidNightMinute,
      //   nextdayEary:
      //     subtractionNextdayEaryHour + ":" + subtractionNextdayEaryMinute,
      //   normal: subtractionHour + ":" + subtractionMinute
      // });

      // TODO 休憩時間を自動算出
      displayHour =
        subtractionHour + subtractionTodayEaryHour + subtractionNextdayEaryHour;

      displayMinute =
        subtractionMinute +
        subtractionTodayEaryMinute +
        subtractionNextdayEaryMinute;

      return (
        this.zeroPaddingTime(displayHour) +
        ":" +
        this.zeroPaddingTime(displayMinute)
      );
    },
    displayMidNightTime(endTime) {
      const fromTimeRange = dayjs(this.displayDate)
        .hour(22)
        .minute(0)
        .second(0);
      const toTimeRange = dayjs(this.displayDate)
        .add(1, "day")
        .hour(5)
        .minute(0)
        .second(0);
      const toTime = dayjs(endTime.iso);

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
    isNoteContents(noteContents) {
      if (noteContents.length > 0) {
        return "あり";
      } else return "なし";
    },
    /** データ変更処理 */
    async setItem(item) {
      console.log(item);
    },
    fieldContents(item) {
      this.detailEdit = item;
      this.fieldDialog = true;
    },
    closeFieldContent() {
      this.fieldDialog = false;
    },
    showFieldEditDialog() {
      this.closeFieldContent();
      this.fieldEditDialog = true;
    },
    // TODO:タブ番号より処理の分岐を記述
    saveFieldDetail() {
      console.log(this.fieldEditTab);
    },
    closeFieldEditDialog() {
      this.fieldEditDialog = false;
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
