<template>
  <v-app id="subCompanyAll">
    <v-card>
      <v-container>
        <h2>協力会社員一覧</h2>
        <v-sheet color="white" rounded outlined>
          <v-row align="center">
            <v-col cols="12" sm="4" md="2"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 協力会社を追加するダイアログ表示ボタン -->
              <v-row justify="center">
                <v-dialog v-model="subCompanyDialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      @click="addSubCompany()"
                      outlined
                      elevation="3"
                    >
                      協力会社を追加
                      <v-icon color="#ff6669">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h6 grey lighten-2">
                      協力会社追加
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">会社名</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="companyName" :rules="companyRules" label="(例)株式会社ABC" maxlength='50' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">設立</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col>
                            <v-menu
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
                                    v-model="foundation"
                                    :rules="foundationRules"
                                    label="設立日を選択"
                                    placeholder="まず20XX年X月をクリック"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    outlined
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                    required
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="foundation"
                                  no-title
                                  scrollable
                                  locale="jp-ja"
                                  :day-format="(date) => new Date(date).getDate()"
                                >
                                  <v-btn
                                    color="#ff6669" class="white--text"
                                    rounded
                                    @click="
                                      $refs.foundationMenu.save(
                                        foundation
                                      )
                                    "
                                  >
                                    OK
                                  </v-btn>
                                  <v-btn
                                    class="#f5f5f5"
                                    rounded
                                    @click="foundationMenu = false"
                                  >
                                    キャンセル
                                  </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">代表者</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="leaderName" :rules="leaderRules" label="(例)宛間太郎" maxlength='8' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">郵便番号</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            v-model = "postNumberFirstName"
                            :rules="postNumberFirstRules"
                            label="123"
                            maxlength='3'
                          ></v-text-field>
                        </v-col>
                        <div class="to-label">-</div>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            v-model = "postNumberLastName"
                            :rules="postNumberLastRules"
                            label="0000"
                            maxlength='4'
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">住所</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="addressName" :rules="addressRules" label="(例)千葉県宛間市宛間123-4" maxlength='100' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">電話番号</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            v-model="telNumberOneName"
                            :rules="telNumberOneRules"
                            label="090"
                            maxlength="4"
                          ></v-text-field>
                        </v-col>
                        <div class="to-label">-</div>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            v-model="telNumberTwoName"
                            :rules="telNumberTwoRules"
                            label="1234"
                            maxlength="4"
                          ></v-text-field>
                        </v-col>
                        <div class="to-label">-</div>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            v-model="telNumberThreeName"
                            :rules="telNumberThreeRules"
                            label="5678"
                            maxlength="4"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">工種</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-select
                            :items="['建築塗装業', '足場', '配管']"
                            outlined
                            label="工種を選択してください"
                            required
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col></v-col>
                        <v-col>
                          <v-btn color="#ff6669" class="white--text" fab small>
                            <v-icon>mdi-plus-thick</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div class="item-title">備考</div>
                        </v-col>
                        <v-col cols="2">
                          <div class="item-required">
                            <v-chip color="white" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-textarea v-model="noteName" :rules="noteRules" maxlength="501" clearable clear-icon="mdi-close-circle" outlined required></v-textarea>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="#ff6669"
                        class="white--text"
                        rounded
                        @click="subCompanyDialog = false"
                      >
                        OK
                      </v-btn>
                      <v-btn
                        @click="subCompanyDialog = false"
                        class="#f5f5f5"
                        rounded
                      >
                        キャンセル
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-col>
          </v-row>
          <v-row align="center">
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="subCompanyHeader"
              :items="getSubCompany"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              item-key="name"
              class="elevation-1 table"
              height="300"
            >
              <template v-slot:top>
                <v-row>
                  <v-col cols="4">
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
                </v-row>
              </template>
              <template v-slot:[`body.append`]> </template>

              <!-- delete Row -->
              <template v-slot:[`item.delete`]="{ item }">
                <v-btn
                  @click.stop="deleteItem(item)"
                  color="#00ffd0"
                  elevation="3"
                  outlined
                  fab
                  height="2.5rem"
                  width="2.5rem"
                >
                  <v-icon large>mdi-delete-empty</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-row>
        </v-sheet>
      </v-container>
    </v-card>
    <div class="page-border-area">
      <div class="page-border"></div>
    </div>
    <v-card>
      <v-container>
        <h2>協力会社員一覧</h2>
        <v-sheet color="white" rounded outlined>
          <v-row align="center">
            <v-col cols="12" sm="4" md="2"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 社員追加ボタン・ダイアログ表示 -->
              <v-dialog v-model="subWorkerDialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="addSubCompany()"
                    outlined
                    elevation="3"
                  >
                    社員を追加
                    <v-icon color="#ff6669">mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    社員追加
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">名前</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field v-model="employeeFirstname" :rules="employeeFirstnameRules" label="(例)宛間" maxlength="25" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field v-model="employeeLastname" :rules="employeeLastnameRules" label="(例)太郎" maxlength="25" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">職員コード</div>
                      </v-col>
                      <v-col cols="2">
                      </v-col>
                      <v-col>
                        <v-text-field v-model="staffCodeName" :rules="staffCodeRules" label="(例)001" maxlength="8" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">生年月日</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="7" md="7"
                            >
                            <v-menu
                                ref="birthdayMenu"
                                v-model="birthdayMenu"
                                :close-on-content-click="false"
                                :return-value.sync="birthday"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="birthday"
                                    :rules="birthdayRules"
                                    label="生年月日を選択"
                                    placeholder="まず20XX年X月をクリック"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    outlined
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                    required
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="birthday"
                                  no-title
                                  scrollable
                                  locale="jp-ja"
                                  :day-format="(date) => new Date(date).getDate()"
                                >
                                  <v-btn
                                    color="#ff6669" class="white--text"
                                    rounded
                                    @click="
                                      $refs.birthdayMenu.save(
                                        birthday
                                      )
                                    "
                                  >
                                    OK
                                  </v-btn>
                                  <v-btn
                                    class="#f5f5f5"
                                    rounded
                                    @click="birthdayMenu = false"
                                  >
                                    キャンセル
                                  </v-btn>
                                </v-date-picker>
                            </v-menu>
                          </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">住所</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field  v-model="addressName" :rules="addressRules" label="(例)千葉県宛間市宛間123-4" maxlength="100" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">Mail</div>
                      </v-col>
                      <v-col cols="2">
                      </v-col>
                      <v-col>
                        <v-text-field  v-model="mailAddressName" :rules="mailAddressRules" label="(例)abc@example.com" maxlength="50" clearable clear-icon="mdi-close-circle" outlined></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">電話番号</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip>
                        </div>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberOneRules"
                          name="telNumberOne"
                          label="090"
                          maxlength="4"
                        ></v-text-field>
                      </v-col>
                      <div class="to-label">-</div>
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberTwoRules"
                          name="telNumberTwo"
                          label="1234"
                          maxlength="4"
                        ></v-text-field>
                      </v-col>
                      <div class="to-label">-</div>
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberThreeRules"
                          name="telNumberThree"
                          label="5678"
                          maxlength="4"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">ログインID</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field v-model="employeeIdName" :rules="employeeIdRules" label="(例)abc001" maxlength="50" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">パスワード</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field v-model="passwordName" :rules="passwordRules" label="※半角英数字" maxlength="50" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">保有資格</div>
                      </v-col>
                      <v-col cols="2">
                      </v-col>
                      <v-col>
                        <v-text-field v-model="licenseName" :rules="lecenseRules" label="(例)普通自動車免許" maxlength="100" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn color="#ff6669" class="white--text" fab small><v-icon>
                                mdi-plus-thick
                              </v-icon></v-btn>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#ff6669"
                      class="white--text"
                      rounded
                      @click="subWorkerDialog = false"
                    >
                      OK
                    </v-btn>
                    <v-btn
                      @click="subWorkerDialog = false"
                      class="#f5f5f5"
                      rounded
                    >
                      キャンセル
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row align="center">
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="subWorkerHeader"
              :items="getAttendanceList"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              item-key="name"
              class="elevation-1 table"
              height="300"
            >
              <template v-slot:top>
                <v-row>
                  <v-col cols="4">
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
                  <!-- 従業員一覧ダウンロードメニュー -->
                  <v-col align="right">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          justify="center"
                          outlined
                          elevation="3"
                          v-bind="attrs"
                          v-on="on"
                          >社員一覧ダウンロード<v-icon color="#00ffd0"
                            >mdi-download</v-icon
                          ></v-btn
                        >
                      </template>
                      <v-list>
                        <v-list-item @click="download('CSV')">
                          <v-list-item-title
                            >自社員一覧（CSV）</v-list-item-title
                          >
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item @click="download('Excel')">
                          <v-list-item-title
                            >自社員一覧（Excel）</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:[`body.append`]> </template>

              <!-- delete Row -->
              <template v-slot:[`item.delete`]="{ item }">
                <v-btn
                  @click.stop="deleteItem(item)"
                  color="#00ffd0"
                  elevation="3"
                  outlined
                  fab
                  height="2.5rem"
                  width="2.5rem"
                >
                  <v-icon large>mdi-delete-empty</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-row>
        </v-sheet>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'subCompanyAll',
  data: () => ({
    subWorkerDialog: false,
    status: '',
    menu: false,
    date: '',
    statusItems: ['出勤中', '休憩中', '退勤中', '早出', '深夜'],
    ditaileEdit: {},
    subCompanyDialog: false,
    noteContentsDialog: false,
    fieldDialog: false,
    foundationMenu: false,
    birthdayMenu: false,
    companyName: '',
    companyRules: [
      v => !!v || '会社名が未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    foundationName: '',
    foundationRules: [
      v => !!v || '設立日が未入力です',
      v => (!!v && v.length <= 10) || `文字数は10文字以内です`
    ],
    leaderName: '',
    leaderRules: [
      v => !!v || '代表者名が未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    postNumberFirstname: '',
    postNumberFirstRules: [
      v => !!v || '郵便番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 3) || `文字数は3文字以内です`
    ],
    postNumberLastName: '',
    postNumberLastRules: [
      v => !!v || '郵便番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    addressName: '',
    addressRules: [
      v => !!v || '住所が未入力です',
      v => (!!v && v.length <= 100) || `文字数は100文字以内です`
    ],
    telNumberOneName: '',
    telNumberOneRules: [
      v => !!v || '電話番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    telNumberTwoName: '',
    telNumberTwoRules: [
      v => !!v || '電話番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    telNumberThreeName: '',
    telNumberThreeRules: [
      v => !!v || '電話番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    noteName: '',
    noteRules: [
      v => v.length <= 500 || `文字数は500文字以内です`
    ],
    employeeFirstname: '',
    employeeFirstnameRules: [
      v => !!v || '姓が未入力です',
      v => (!!v && v.length <= 25) || `文字数は25文字以内です`
    ],
    employeeLastname: '',
    employeeLastnameRules: [
      v => !!v || '名が未入力です',
      v => (!!v && v.length <= 25) || `文字数は25文字以内です`
    ],
    staffCodeName: '',
    staffCodeRules: [
      v => v.length <= 8 || `文字数は8文字以内です`
    ],
    birthdayName: '',
    birthdayRules: [
      v => !!v || '生年月日が未入力です'
    ],
    mailAddressName: '',
    mailAddressRules: [
      v => /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v) || 'メールアドレスの形式が間違っています',
      v => v.length <= 100 || `文字数は100文字以内です`
    ],
    employeeIdName: '',
    employeeIdRules: [
      v => !!v || 'ログインIDが未入力です',
      v => /^[A-Za-z0-9]*$/.test(v) || '',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    passwordName: '',
    passwordRules: [
      v => !!v || 'パスワードが未入力です',
      v => /^[A-Za-z0-9]*$/.test(v) || '',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    licenseName: '',
    licenseRules: [
      v => v.length <= 100 || `文字数は100文字以内です`
    ]
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    subCompanyHeader () {
      return [
        {
          text: '会社名',
          align: 'center',
          sortable: false,
          value: 'companyName',
          width: '20%'
        },
        {
          text: '工種',
          value: 'type',
          align: 'center',
          filter: value => {
            if (!this.status) return true

            return value < parseInt(this.status)
          },
          width: '30%'
        },
        { text: '削除',
          value: 'delete',
          sortable: false,
          align: 'right',
          width: '50%'}
      ]
    },
    /** v-tableのヘッダーを設定 */
    subWorkerHeader () {
      return [
        {
          text: '職員名',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '20%'
        },
        {
          text: '所属会社',
          value: 'companyName',
          align: 'center',
          width: '30%'
        },
        { text: '削除', value: 'delete', sortable: false, align: 'right', width: '50%' }
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getSubCompany () {
      /** ToDo */
      /** Vuex subCompanyで定義したActionメソッドをここで呼び出し */
      return this.$store.state.subCompany.subCompany
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getAttendanceList () {
      /** ToDo */
      /** Vuex attendanceListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.attendanceList.attendanceList
    }
  },
  methods: {
    // ページ遷移処理
    download (format) {
      console.log(format)
    },
    // 検索
    filterOnlyCapsText (value, search, item) {
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
    fieldContents (item) {
      this.ditaileEdit = item
      this.fieldDialog = true
    },
    addSubCompany () {
      console.log('true')
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  height: 75px;
  padding-top: 12px;
  font-size: 3.8rem;
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
.page-border-area {
  padding-top: 30px;
  padding-bottom: 30px;
}
.page-border {
  border-bottom: 1px solid;
  border-color: #cccccc;
}
.to-label {
  line-height: 80px;
}
</style>
