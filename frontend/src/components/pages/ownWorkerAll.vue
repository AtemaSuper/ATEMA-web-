<template>
  <v-app id="ownWorkerAll">
    <v-card>
      <v-container>
        <v-sheet color="white" rounded outlined>
          <h2>自社員管理</h2>
          <v-row align="center">
            <v-col cols="12" sm="4" md="2"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 自社員を追加するボタン -->
              <v-btn @click="editWorkerItem()" outlined elevation="3">
                自社員を追加
                <v-icon color="#ff6669">mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center">
            <!-- 自社員一覧 data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="ownWorkerHeader"
              :items="getOwnWorker"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="-1"
              item-key="name"
              class="elevation-1 table"
              height="300"
              @click:row="showWokerItem"
            >
              <template v-slot:top>
                <v-row>
                  <v-col>
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
                  <v-spacer></v-spacer>
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
                <!-- 従業員削除ダイアログ -->
                <v-dialog v-model="dialogWorkerDelete" max-width="500px">
                  <v-card>
                    <v-card-title align="center"
                      >この社員を削除しますか?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="deleteWorkerItemConfirm">
                        OK
                      </v-btn>
                      <v-btn color="white" @click="closeWorkerDelete">
                        キャンセル
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- 従業員詳細表示ダイアログ -->
                <v-dialog
                  v-model="dialogWorkerShow"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      従業員詳細
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>名前</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.firstname }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>役職</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.postLabel }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>職員コード</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.code }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>生年月日</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.birthday }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>住所</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.address }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>Mail</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.mail }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>電話番号</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.phoneNumber }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>ログインID</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.loginId }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>パスワード</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.password }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>所属期間</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ editedWorkerItem.openDate }}～{{
                              editedWorkerItem.cloceDate
                            }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>雇用形態</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            {{ employmentList[editedWorkerItem.employmentId] }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="4" sm="4">
                            <p>保有資格</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <table>
                              <thead>
                                <tr>
                                  <th>資格名</th>
                                  <th></th>
                                  <th>資格取得日</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="license in editedWorkerItem.license"
                                  v-bind:key="license.id"
                                >
                                  <td>{{ license.licenseName }}</td>
                                  <td></td>
                                  <td>{{ license.licenseDate }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="editWorkerItem()" color="#ff6669" elevation="3" outlined rounded>
                        編集
                      </v-btn>
                      <v-btn @click="closeWorkerShow()" class="#f5f5f5" rounded
                        >キャンセル</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- 従業員詳細編集ダイアログ -->
                <v-dialog
                  v-model="dialogWorkerEdit"
                  max-width="700px"
                  persistent
                >
                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      {{ workerFormTitle }}
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>名前</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2">
                              <v-chip color="red" dark>必須</v-chip>
                          </v-col>
                          <v-col cols="12" sm="3" md="3">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedWorkerItem.firstname"
                              :rules="editedWorkerItem.firstnameRules"
                              label="(例)宛間"
                              maxlength='50'
                              clearable
                              clear-icon="mdi-close-circle"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="3" md="3">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedWorkerItem.Lastname"
                              :rules="editedWorkerItem.LastnameRules"
                              label="(例)太郎"
                              maxlength='50'
                              clearable
                              clear-icon="mdi-close-circle"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="1" md="1"></v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>役職</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7">
                            <v-select
                              :items="getPostList"
                              item-text="postName"
                              item-value="postId"
                              v-model="editedWorkerItem.post"
                              solo
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>職員コード</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedWorkerItem.code"
                              :rules="editedWorkerItem.codeRules"
                              label="(例)001"
                              maxlength='8'
                              clearable
                              clear-icon="mdi-close-circle"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>生年月日</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7"
                            ><v-menu
                              ref="birthdayMenu"
                              v-model="birthdayMenu"
                              :close-on-content-click="false"
                              :return-value.sync="editedWorkerItem.birthday"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedWorkerItem.birthday"
                                  :rules="birthdayRules"
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
                                v-model="editedWorkerItem.birthday"
                                no-title
                                scrollable
                                locale="jp-ja"
                                :day-format="(date) => new Date(date).getDate()"
                              >
                                <v-btn
                                  color="#ff6669" class="white--text" rounded
                                  @click="
                                    $refs.birthdayMenu.save(
                                      editedWorkerItem.birthday
                                    )
                                  "
                                >
                                  OK
                                </v-btn>
                                <v-btn
                                   class="#f5f5f5" rounded
                                  @click="birthdayMenu = false"
                                >
                                  キャンセル
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>住所</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedWorkerItem.address"
                              :rules="editedWorkerItem.addressRules"
                              label="(例)千葉県宛間市宛間123-4"
                              maxlength="100"
                              clearable
                              clear-icon="mdi-close-circle"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>Mail</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedWorkerItem.mail"
                              :rules="editedWorkerItem.mailRules"
                              label="(例)abc@example.com"
                              maxlength="100"
                              clearable
                              clear-icon="mdi-close-circle"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" md="3">
                            <p>電話番号</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" md="7" sm="7">
                            <v-row>
                              <v-col cols="12" sm="3" md="3">
                              <v-text-field
                                outlined
                                dense
                                v-model="editedWorkerItem.telNumberOne"
                                :rules="editedWorkerItem.telNumberOneRules"
                                maxlength="3"
                                required
                              ></v-text-field>
                              </v-col>
                              <div class="to-label">-</div>
                              <v-col cols="12" sm="3" md="3">
                                <v-text-field
                                  outlined
                                  dense
                                  v-model="editedWorkerItem.telNumberTwo"
                                  :rules="editedWorkerItem.telNumberTwoRules"
                                  maxlength="4"
                                  required
                                ></v-text-field>
                              </v-col>
                              <div class="to-label">-</div>
                              <v-col cols="12" sm="3" md="3">
                                <v-text-field
                                  outlined
                                  dense
                                  v-model="editedWorkerItem.telNumberThree"
                                  :rules="editedWorkerItem.telNumberThreeRules"
                                  maxlength="4"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>ログインID</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2">
                              <v-chip color="red" dark>必須</v-chip>
                          </v-col>
                          <v-col cols="12" sm="7" md="7">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedWorkerItem.loginId"
                              :rules="editedWorkerItem.loginIdRules"
                              label="(例)abc001"
                              maxlength="50"
                              clearable
                              clear-icon="mdi-close-circle"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>パスワード</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2">
                              <v-chip color="red" dark>必須</v-chip>
                          </v-col>
                          <v-col cols="12" sm="7" md="7">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedWorkerItem.password"
                              :rules="editedWorkerItem.passwordRules"
                              label="半角英数字"
                              maxlength="50"
                              clearable
                              clear-icon="mdi-close-circle"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>所属期間</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7"
                            ><v-menu
                              ref="openDateMenu"
                              v-model="openDateMenu"
                              :close-on-content-click="false"
                              :return-value.sync="editedWorkerItem.openDate"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedWorkerItem.openDate"
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
                                v-model="editedWorkerItem.openDate"
                                no-title
                                scrollable
                                locale="jp-ja"
                                :day-format="(date) => new Date(date).getDate()"
                              >
                                <v-btn
                                  color="#ff6669" class="white--text"
                                  rounded
                                  @click="
                                    $refs.openDateMenu.save(
                                      editedWorkerItem.openDate
                                    )
                                  "
                                >
                                  OK
                                </v-btn>
                                <v-btn
                                  class="#f5f5f5"
                                  rounded
                                  @click="openDateMenu = false"
                                >
                                  キャンセル
                                </v-btn>
                              </v-date-picker> </v-menu
                            >～<v-menu
                              ref="closeDateMenu"
                              v-model="closeDateMenu"
                              :close-on-content-click="false"
                              :return-value.sync="editedWorkerItem.cloceDate"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedWorkerItem.cloceDate"
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
                                v-model="editedWorkerItem.cloceDate"
                                no-title
                                scrollable
                                locale="jp-ja"
                                :day-format="(date) => new Date(date).getDate()"
                              >
                                <v-btn
                                  color="#ff6669" class="white--text"
                                  rounded
                                  @click="
                                    $refs.closeDateMenu.save(
                                      editedWorkerItem.cloceDate
                                    )
                                  "
                                >
                                  OK
                                </v-btn>
                                <v-btn
                                  @click="closeDateMenu = false"
                                  class="#f5f5f5"
                                  rounded
                                >
                                  キャンセル
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>雇用形態</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7">
                            <v-radio-group
                              v-model="editedWorkerItem.employmentId"
                              row
                              mandatory
                            >
                              <v-radio label="正規" value="1" color="#ff6669"></v-radio>
                              <v-radio label="非正規" value="2"  color="#ff6669"></v-radio>
                              <v-radio label="委託" value="3" color="#ff6669"></v-radio>
                              <v-radio label="派遣" value="4" color="#ff6669"></v-radio>
                            </v-radio-group>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="3" sm="3">
                            <p>保有資格</p>
                          </v-col>
                          <v-col cols="12" md="2" sm="2"></v-col>
                          <v-col cols="12" sm="7" md="7">
                            <table>
                              <thead>
                                <tr>
                                  <th>資格名</th>
                                  <th></th>
                                  <th>資格取得日</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="license in editedWorkerItem.license"
                                  v-bind:key="license.id"
                                >
                                  <td>
                                    <v-text-field
                                      outlined
                                      dense
                                      v-model="license.licenseName"
                                    ></v-text-field>
                                  </td>
                                  <td></td>
                                  <td>
                                    <v-text-field
                                      outlined
                                      dense
                                      v-model="license.licenseDate"
                                    ></v-text-field>
                                  </td>
                                </tr>
                              </tbody>
                              <v-btn color="#ff6669" class="white--text" fab small><v-icon>
                                mdi-plus-thick
                              </v-icon></v-btn>
                            </table>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#ff6669" class="white--text" rounded @click="saveWorker()">
                        OK
                      </v-btn>
                      <v-btn @click="closeWorkerEdit()" class="#f5f5f5" rounded>
                        キャンセル
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <!-- name Row -->
              <template v-slot:[`item.name`]="{ item }">
                {{ item.name }}
              </template>
              <!-- companyName Row -->
              <template v-slot:[`item.companyName`]="{ item }">
                {{ item.companyName }}
              </template>
              <!-- postName Row -->
              <template v-slot:[`item.postLabel`]="{ item }">
                {{ item.postLabel }}
              </template>

              <!-- delete Row -->
              <template v-slot:[`item.delete`]="{ item }">
                <v-btn
                  @click.stop="deleteWorkerItem(item)"
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
    <v-container>
      <v-sheet color="white" rounded outlined>
        <v-card>
          <h2>役職管理</h2>
          <v-row align="center">
            <v-col cols="12" sm="4" md="2"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 役職を追加するボタン -->
              <v-btn @click="editPostItem()" outlined elevation="3">
                役職を追加
                <v-icon color="#ff6669">mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- data teble-->
          <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
          <v-data-table
            :headers="postListHeader"
            :items="getPostList"
            :items-per-page="-1"
            item-key="postId"
            class="elevation-1 table"
            height="300"
            @click:row="editPostItem"
          >
            <template v-slot:top>
              <!-- 役職削除ダイアログ -->
              <v-dialog v-model="dialogPostDelete" max-width="500px">
                <v-card>
                  <v-card-title align="center"
                    >この役職を削除しますか?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="deletePostItemConfirm">
                      OK
                    </v-btn>
                    <v-btn color="white" @click="closePostDelete"> キャンセル </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 役職編集・追加ダイアログ -->
              <v-dialog v-model="dialogPostEdit" persistent max-width="1200px">
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    {{ postFormTitle }}
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="2">
                          <p>役職名</p>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedPostItem.postName"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                      <v-row>
                        <v-col cols="2">出退勤管理 </v-col>
                        <v-col cols="2"> 自社員管理</v-col>
                        <v-col cols="2"> 協力会社管理</v-col>
                        <v-col cols="2"> 自社設定</v-col>
                        <v-col cols="2"> プラン・支払い</v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2"
                          ><v-select
                            :items="postPermissionList"
                            v-model="editedPostItem.attendancePermission"
                            item-text="label"
                            item-value="value"
                            label="権限を選択"
                            solo
                          ></v-select>
                        </v-col>
                        <v-col cols="2"
                          ><v-select
                            :items="postPermissionList"
                            v-model="editedPostItem.ownWorkerPermission"
                            item-text="label"
                            item-value="value"
                            label="権限を選択"
                            solo
                          ></v-select>
                        </v-col>
                        <v-col cols="2"
                          ><v-select
                            :items="postPermissionList"
                            v-model="editedPostItem.subWorkerPermission"
                            item-text="label"
                            item-value="value"
                            label="権限を選択"
                            solo
                          ></v-select>
                        </v-col>
                        <v-col cols="2"
                          ><v-select
                            :items="postPermissionList"
                            v-model="editedPostItem.ownCompanyPermission"
                            item-text="label"
                            item-value="value"
                            label="権限を選択"
                            solo
                          ></v-select> </v-col
                        ><v-col cols="2"
                          ><v-select
                            :items="postPermissionList"
                            v-model="editedPostItem.planPayPermission"
                            item-text="label"
                            item-value="value"
                            label="権限を選択"
                            solo
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#ff6669" class="white--text" rounded @click="savePost()">
                      OK
                    </v-btn>
                    <v-btn @click="closePostEdit()" class="#f5f5f5" rounded>
                      キャンセル
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <!-- postName Row -->
            <template v-slot:[`item.postName`]="{ item }">
              {{ item.postName }}
            </template>
            <!-- attendancePermission Row -->
            <template v-slot:[`item.attendancePermission`]="{ item }">
              <div v-if="item.attendancePermission === -1">✕</div>
              <div v-else-if="item.attendancePermission === 0">閲覧のみ</div>
              <div v-else>全て</div>
            </template>
            <!-- ownWorkerPermission Row -->
            <template v-slot:[`item.ownWorkerPermission`]="{ item }">
              <div v-if="item.ownWorkerPermission === -1">✕</div>
              <div v-else-if="item.ownWorkerPermission === 0">閲覧のみ</div>
              <div v-else>全て</div>
            </template>
            <!-- subWorkerPermission Row -->
            <template v-slot:[`item.subWorkerPermission`]="{ item }">
              <div v-if="item.subWorkerPermission === -1">✕</div>
              <div v-else-if="item.subWorkerPermission === 0">閲覧のみ</div>
              <div v-else>全て</div>
            </template>
            <!-- ownCompanyPermission Row -->
            <template v-slot:[`item.ownCompanyPermission`]="{ item }">
              <div v-if="item.ownCompanyPermission === -1">✕</div>
              <div v-else-if="item.ownCompanyPermission === 0">閲覧のみ</div>
              <div v-else>全て</div>
            </template>
            <!-- planPayPermission Row -->
            <template v-slot:[`item.planPayPermission`]="{ item }">
              <div v-if="item.planPayPermission === -1">✕</div>
              <div v-else-if="item.planPayPermission === 0">閲覧のみ</div>
              <div v-else>全て</div>
            </template>
            <!-- delete Row -->
            <template v-slot:[`item.delete`]="{ item }">
              <v-btn
                @click.stop="deletePostItem(item)"
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
        </v-card>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'ownWorkerAll',
  components: {
  },
  data: () => ({
    search: '',
    dialogWorkerDelete: false,
    dialogWorkerShow: false,
    dialogWorkerEdit: false,
    editedWorkerIndex: -1,
    closeDateMenu: false,
    openDateMenu: false,
    birthdayMenu: false,
    dialogPostDelete: false,
    dialogPostEdit: false,
    editedPostIndex: -1,
    editedWorkerItem: {
      firstname: '',
      firstnameRules: [
        v => !!v || '姓が未入力です',
        v => (!!v && v.length <= 50) || `文字数は50文字以内です`
      ],
      Lastname: '',
      LastnameRules: [
        v => !!v || '名が未入力です',
        v => (!!v && v.length <= 50) || `文字数は50文字以内です`
      ],
      companyName: '',
      post: 0,
      postLabel: '',
      code: '',
      codeRules: [
        v => v.length <= 8 || `文字数は8文字以内です`
      ],
      birthday: '',
      address: '',
      addressRules: [
        v => v.length <= 100 || `文字数は100文字以内です`
      ],
      mail: '',
      mailRules: [
        v => v.length <= 100 || `文字数は100文字以内です`
      ],
      tellNumberOne: '',
      tellNumberOneRules: [
        v => v.length <= 3 || `文字数は3文字以内です`
      ],
      tellNumberTwo: '',
      tellNumberTwoRules: [
        v => v.length <= 4 || `文字数は4文字以内です`
      ],
      tellNumberThree: '',
      tellNumberThreeRules: [
        v => v.length <= 4 || `文字数は4文字以内です`
      ],
      loginId: '',
      loginIdRules: [
        v => !!v || 'ログインIDが未入力です',
        v => (!!v && v.length <= 50) || `文字数は50文字以内です`
      ],
      password: '',
      passwordRules: [
        v => !!v || 'パスワードが未入力です',
        v => (!!v && v.length <= 50) || `文字数は50文字以内です`
      ],
      openDate: '',
      cloceDate: '',
      employmentId: 0,
      license: 0,
      licenseDate: ''
    },
    defaultWorkerItem: {
      name: '',
      companyName: '',
      post: 0,
      postLabel: '',
      code: '',
      birthday: '',
      address: '',
      mail: '',
      phoneNumber: '',
      loginId: '',
      password: '',
      openDate: '',
      cloceDate: '',
      employmentId: 0,
      license: 0,
      licenseDate: ''
    },
    editedPostItem: {
      postName: '',
      attendancePermission: -1,
      ownWorkerPermission: -1,
      subWorkerPermission: -1,
      ownCompanyPermission: -1,
      planPayPermission: -1
    },
    defaultPostItem: {
      postName: '',
      attendancePermission: -1,
      ownWorkerPermission: -1,
      subWorkerPermission: -1,
      ownCompanyPermission: -1,
      planPayPermission: -1
    },
    employmentList: ['none', '正規', '非正規', '委託', '派遣'],
    postPermissionList: [{value: -1, label: '✕'}, {value: 0, label: '閲覧のみ'}, {value: 1, label: '全て'}]
  }),
  computed: {
    // 従業員追加・編集ダイアログによるタイトル判別
    workerFormTitle () {
      return this.editedWorkerIndex === -1 ? '新規従業員の追加' : '従業員情報の編集'
    },
    // 役職追加・編集ダイアログによるタイトル判別
    postFormTitle () {
      return this.editedPostIndex === -1 ? '役職を追加' : '役職の編集'
    },
    /** v-tableのヘッダーを設定 */
    ownWorkerHeader () {
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
          sortable: false,
          width: '30%'
        },
        {
          text: '役職',
          value: 'postLabel',
          align: 'center',
          sortable: false,
          width: '20%'
        },
        { text: '削除',
          value: 'delete',
          sortable: false,
          align: 'right',
          width: '30%'}
      ]
    },
    /** v-tableのヘッダーを設定 */
    postListHeader () {
      return [
        {
          text: '権限',
          align: 'center',
          sortable: false,
          value: 'postName',
          width: '14%'
        },
        {
          text: '出退勤管理',
          value: 'attendancePermission',
          align: 'center',
          width: '14%'
        },
        {
          text: '自社員管理',
          value: 'ownWorkerPermission',
          align: 'center',
          width: '14%'
        },
        {
          text: '協力会社管理',
          value: 'subWorkerPermission',
          align: 'center',
          width: '14%'
        },
        {
          text: '自社設定',
          value: 'ownCompanyPermission',
          align: 'center',
          width: '14%'
        },
        {
          text: 'プラン・支払い',
          value: 'planPayPermission',
          align: 'center',
          width: '14%'
        },
        { text: '削除', value: 'delete', sortable: false, align: 'right', width: '14%' }
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getOwnWorker () {
      /** ToDo */
      /** Vuex 定義したActionメソッドをここで呼び出し */
      return this.$store.state.ownWorker.ownWorker
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getPostList () {
      /** ToDo */
      /** Vuex 定義したActionメソッドをここで呼び出し */
      return this.$store.state.postList.postList
    }
  },
  methods: {
    // 選択したレコードの情報格納・レコード詳細ダイアログの表示
    showWokerItem (item) {
      this.editedWorkerIndex = this.getOwnWorker.indexOf(item)
      this.editedWorkerItem = Object.assign({}, item)
      this.dialogWorkerShow = true
      console.log(this.editedWorkerItem)
    },
    // 社員追加・編集ダイアログ表示
    editWorkerItem (item) {
      if (this.dialogWorkerShow) this.dialogWorkerShow = false
      this.dialogWorkerEdit = true
    },
    // 社員追加・編集ダイアログ表示
    editPostItem (item) {
      this.editedPostIndex = this.getPostList.indexOf(item)
      this.editedPostItem = Object.assign({}, item)
      this.dialogPostEdit = true
    },
    // レコード削除ダイアログキャンセル処理（ダイアログ非表示・削除レコード情報の初期化）
    closeWorkerShow () {
      this.dialogWorkerShow = false
      this.$nextTick(() => {
        this.editedWorkerItem = Object.assign({}, this.defaultWorkerItem)
        this.editedWorkerIndex = -1
      })
    },
    // 削除レコード情報の格納・レコード削除ダイアログの表示
    deleteWorkerItem (item) {
      this.editedWorkerIndex = this.getOwnWorker.indexOf(item)
      this.editedWorkerItem = Object.assign({}, item)
      this.dialogWorkerDelete = true
    },
    // 削除レコード情報の格納・レコード削除ダイアログの表示
    deletePostItem (item) {
      this.editedPostIndex = this.getPostList.indexOf(item)
      this.editedPostItem = Object.assign({}, item)
      this.dialogPostDelete = true
    },
    // レコード削除ダイアログキャンセル処理（ダイアログ非表示・削除レコード情報の初期化）
    closeWorkerDelete () {
      this.dialogWorkerDelete = false
      this.$nextTick(() => {
        this.editedWorkerItem = Object.assign({}, this.defaultWorkerItem)
        this.editedWorkerIndex = -1
      })
    },
    // レコード削除ダイアログキャンセル処理（ダイアログ非表示・削除レコード情報の初期化）
    closePostDelete () {
      this.dialogPostDelete = false
      this.$nextTick(() => {
        this.editedPostItem = Object.assign({}, this.defaultPostItem)
        this.editedPostIndex = -1
      })
    },
    // 社員追加・編集ダイアログ非表示・選択レコード情報の削除
    closeWorkerEdit () {
      this.dialogWorkerEdit = false
      this.$nextTick(() => {
        this.editedWorkerItem = Object.assign({}, this.defaultWorkerItem)
        this.editedWorkerIndex = -1
      })
    },
    // 役職追加・編集ダイアログ非表示・選択レコード情報の削除
    closePostEdit () {
      this.dialogPostEdit = false
      this.$nextTick(() => {
        this.editedPostItem = Object.assign({}, this.defaultPostItem)
        this.editedPostIndex = -1
      })
    },
    // データ追加・編集処理
    saveWorker () { // editedWorkerIndex=レコードを選択後の処理
      if (this.editedWorkerIndex > -1) {
        // 選択したpostIdをリストから検索し、postNameをpostLabelへ保存
        const result = this.getPostList.find((v) => v.postId === this.editedWorkerItem.post)
        if (result) {
          // データが存在した時の処理
          console.log(result.postName)
          this.editedWorkerItem.postLabel = result.postName
        } else {
        }
        Object.assign(this.getOwnWorker[this.editedWorkerIndex], this.editedWorkerItem)
      } else { // 新規レコードの場合
        this.getOwnWorker.push(this.editedWorkerItem)
      }

      this.close()
    },
    // データ追加・編集処理
    savePost () { // editedPostIndex=レコードを選択後の処理
      if (this.editedPostIndex > -1) {
        Object.assign(this.getPostList[this.editedPostIndex], this.editedPostItem)
      } else { // 新規レコードの場合
        this.getPostList.push(this.editedPostItem)
      }

      this.close()
    },
    // DOM処理終了後処理（データ追加・データ更新）初期化
    close () {
      if (this.dialogWorkerEdit) {
        this.dialogWorkerEdit = false
        this.$nextTick(() => {
          this.editedWorkerItem = Object.assign({}, this.defaultWorkerItem)
          this.editedWorkerIndex = -1
        })
      } else {
        this.dialogPostEdit = false
        this.editedPostItem = Object.assign({}, this.defaultWorkerItem)
        this.editedPostIndex = -1
      }
    },
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
    /** ステータスカラーの変更 */
    getColor (status) {
      if (status === '出勤中') return 'green'
      else if (status === '休憩中') return 'orange'
      else return 'red'
    },
    /** データ変更処理 */
    setItem (item) {
      /** ToDo vuex 必要ないかも？ */
      console.log(item)
    },
    /** データ削除処理 */
    deleteWorkerItemConfirm () {
      this.getOwnWorker.splice(this.editedWorkerIndex, 1)
      this.closeWorkerDelete()
    },
    /** データ削除処理 */
    deletePostItemConfirm () {
      this.getPostList.splice(this.editedPostIndex, 1)
      this.closePostDelete()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  height: 75px;
  padding-top: 25px;
  font-size: 3.8rem;
  background-color: #cccccc;
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
  line-height: 70px;
}
</style>
