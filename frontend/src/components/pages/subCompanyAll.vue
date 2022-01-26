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
                <v-dialog v-model="subCompanyDialog" max-width="600px">
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
                          <v-text-field outlined></v-text-field>
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
                          <v-text-field outlined></v-text-field>
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
                          <v-text-field outlined></v-text-field>
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
                            :rules="postNumberFirstRules"
                            name="postNumberFirst"
                          ></v-text-field>
                        </v-col>
                        <div class="to-label">-</div>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            :rules="postNumberLastRules"
                            name="postNumberLast"
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
                          <v-text-field outlined></v-text-field>
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
                          ></v-text-field>
                        </v-col>
                        <div class="to-label">-</div>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            :rules="telNumberTwoRules"
                            name="telNumberTwo"
                          ></v-text-field>
                        </v-col>
                        <div class="to-label">-</div>
                        <v-col cols="2">
                          <v-text-field
                            outlined
                            :rules="telNumberThreeRules"
                            name="telNumberThree"
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
                            <v-chip color="red" dark>必須</v-chip>
                          </div>
                        </v-col>
                        <v-col>
                          <v-textarea outlined></v-textarea>
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
              <v-dialog v-model="subWorkerDialog" max-width="600px">
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
                        <v-text-field outlined></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">職員コード</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field outlined></v-text-field>
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
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberOneRules"
                          name="telNumberOne"
                        ></v-text-field>
                      </v-col>
                      <div class="to-label">/</div>
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberTwoRules"
                          name="telNumberTwo"
                        ></v-text-field>
                      </v-col>
                      <div class="to-label">/</div>
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberThreeRules"
                          name="telNumberThree"
                        ></v-text-field>
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
                        <v-text-field outlined></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">Mail</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field outlined></v-text-field>
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
                        ></v-text-field>
                      </v-col>
                      <div class="to-label">-</div>
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberTwoRules"
                          name="telNumberTwo"
                        ></v-text-field>
                      </v-col>
                      <div class="to-label">-</div>
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          :rules="telNumberThreeRules"
                          name="telNumberThree"
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
                        <v-text-field outlined></v-text-field>
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
                        <v-text-field outlined></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">雇用形態</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field outlined></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <div class="item-title">保有資格</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="item-required">
                          <v-chip color="red" dark>必須</v-chip></div>
                      </v-col>
                      <v-col>
                        <v-text-field outlined></v-text-field>
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
    fieldDialog: false
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
