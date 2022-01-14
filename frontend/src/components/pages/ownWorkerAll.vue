<template>
  <v-app id="ownWorkerAll">
    <v-container>
      <v-sheet color="white" rounded outlined>
        <v-row align="center">
          <v-col cols="12" sm="4" md="2"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="2">
            <!-- 自社員を追加するボタン -->
            <v-btn outlined @click="editWorkerItem()"
              >自社員を追加<v-icon>mdi-plus</v-icon></v-btn
            >
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
                      <v-btn justify="center" outlined v-bind="attrs" v-on="on">
                        社員一覧ダウンロード
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="download('CSV')">
                        <v-list-item-title>自社員一覧（CSV）</v-list-item-title>
                      </v-list-item>
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
                      削除
                    </v-btn>
                    <v-btn color="white" @click="closeWorkerDelete">
                      戻る
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 従業員詳細表示ダイアログ -->
              <v-dialog v-model="dialogWorkerShow" max-width="600px">
                <v-card>
                  <v-card-title>
                    <v-row>
                      <v-col cols="12" lg="12" sm="12">
                        <span class="text-h4">従業員詳細</span>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>名前</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedWorkerItem.name }}
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
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="editWorkerItem()">
                      編集
                    </v-btn>
                    <v-btn color="white" @click="closeWorkerShow()">
                      キャンセル
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 従業員詳細編集ダイアログ -->
              <v-dialog v-model="dialogWorkerEdit" max-width="600px">
                <v-card>
                  <v-card-title>
                    <v-row>
                      <v-col cols="12" lg="12" sm="12">
                        <span class="text-h4">{{ workerFormTitle }}</span>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>名前</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedWorkerItem.name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>役職</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
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
                        <v-col cols="12" lg="4" sm="4">
                          <p>職員コード</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedWorkerItem.code"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>生年月日</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6"
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
                                label="日付を選択"
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
                                text
                                color="primary"
                                @click="birthdayMenu = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.birthdayMenu.save(
                                    editedWorkerItem.birthday
                                  )
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>住所</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedWorkerItem.address"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>Mail</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedWorkerItem.mail"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>電話番号</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedWorkerItem.phoneNumber"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>ログインID</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedWorkerItem.loginId"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>パスワード</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            dense
                            v-model="editedWorkerItem.password"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>所属期間</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6"
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
                                text
                                color="primary"
                                @click="openDateMenu = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.openDateMenu.save(
                                    editedWorkerItem.openDate
                                  )
                                "
                              >
                                OK
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
                                text
                                color="primary"
                                @click="closeDateMenu = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.closeDateMenu.save(
                                    editedWorkerItem.cloceDate
                                  )
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="4" sm="4">
                          <p>雇用形態</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-radio-group
                            v-model="editedWorkerItem.employmentId"
                            row
                            mandatory
                          >
                            <v-radio label="正規" value="1"></v-radio>
                            <v-radio label="非正規" value="2"></v-radio>
                            <v-radio label="委託" value="3"></v-radio>
                            <v-radio label="派遣" value="4"></v-radio>
                          </v-radio-group>
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
                            <v-btn class="mx-2" fab dark color="indigo">
                              <v-icon dark> mdi-plus </v-icon>
                            </v-btn>
                          </table>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveWorker()"> 編集 </v-btn>
                    <v-btn color="white" @click="closeWorkerEdit()">
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
              <v-icon @click.stop="deleteWorkerItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-row>
      </v-sheet>
    </v-container>
    <v-row class="title">
      <v-col cols="2"></v-col>
      <v-col>
        <v-card>役職管理 </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-container>
      <v-sheet color="white" rounded outlined>
        <v-row align="center">
          <v-col cols="12" sm="4" md="2"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="2">
            <!-- 役職を追加するボタン -->
            <v-btn outlined @click="editPostItem()"
              >役職を追加<v-icon>mdi-plus</v-icon></v-btn
            >
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
                    削除
                  </v-btn>
                  <v-btn color="white" @click="closePostDelete"> 戻る </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- 役職編集・追加ダイアログ -->
            <v-dialog v-model="dialogPostEdit" max-width="1200px">
              <v-card>
                <v-card-title>
                  <v-row>
                    <v-col cols="12" lg="12" sm="12">
                      <span class="text-h4">{{ postFormTitle }}</span>
                    </v-col>
                  </v-row>
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
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="savePost()"> 保存 </v-btn>
                  <v-btn color="white" @click="closePostEdit()">
                    キャンセル
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <!-- postName Row -->
          <template v-slot:[`item.postName`]="{ item }">
            <v-btn outlined @click="editPostItem(item)">
              {{ item.postName }}
            </v-btn>
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
            <v-icon @click.stop="deletePostItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
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
</style>
