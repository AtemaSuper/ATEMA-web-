<template>
  <v-app id="ownWorkerAll">
<!-- 自社員一覧 -->
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
              <v-btn @click="showEditEmployee()" outlined elevation="3">
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
              :items="employeeList"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="-1"
              item-key="name"
              class="elevation-1 table"
              height="300"
              @click:row="showEditEmployee"
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
                  @click.stop="showDeleteEmployeeConfirm(item)"
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
<!-- 役職一覧 -->
        <v-card>
          <h2>役職管理</h2>
          <v-row align="center">
            <v-col cols="12" sm="4" md="2"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 役職を追加するボタン -->
              <v-btn @click="showEditPost()" outlined elevation="3">
                役職を追加
                <v-icon color="#ff6669">mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- data teble-->
          <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
          <v-data-table
            :headers="postListHeader"
            :items="postList"
            :items-per-page="-1"
            item-key="postId"
            class="elevation-1 table"
            height="300"
            @click:row="showEditPost"
          >
            <template v-slot:top>
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
                @click.stop="showDeletePostConfirm(item)"
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
<!-- 従業員詳細表示ダイアログ -->
        <v-dialog
          v-model="employeeDialog"
          persistent
          max-width="600px"
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{employeeDialogName}}
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">名前</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ employeeEditItem.employeeName }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-col>
                        <v-text-field
                          v-model="employeeEditItem.employeeFirstname"
                          label="名前(姓)"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="employeeEditItem.employeeLastname"
                          label="名前(名)"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">役職</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ employeeEditItem.selectPost ? employeeEditItem.selectPost["postName"] : "" }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-select 
                        v-model="employeeEditItem.selectPost" 
                        :items="postList" 
                        item-text="postName"
                        item-value="value" 
                        return-object
                      ></v-select>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">職員コード</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ employeeEditItem.staffCode }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.staffCode"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">生年月日</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ displayDateFormat(employeeEditItem.birthday) }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-menu
                        ref="birthdayMenu"
                        v-model="birthdayMenu"
                        :close-on-content-click="false"
                        :return-value.sync="birthdayMenu"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="displayDateFormat(employeeEditItem.birthday)"
                            placeholder="まず20XX年X月をクリック"
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
                          v-model="employeeEditItem.birthday"
                          no-title
                          scrollable
                          locale="jp-ja"
                          :day-format="(date) => new Date(date).getDate()"
                        >
                          <v-btn
                              color="#ff6669" class="white--text" rounded
                              @click="
                              $refs.birthdayMenu.save(
                                employeeEditItem.birthday
                              )"
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
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">住所</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                    {{ employeeEditItem.address }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.address"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">Mail</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                    {{ employeeEditItem.mailAddress }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.mailAddress"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">電話番号</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <div v-if="!employeeEditFlag" class="dialog-to-label">
                    {{ employeeEditItem.telNumber1 + "-" + employeeEditItem.telNumber2 + "-" + employeeEditItem.telNumber3}}
                  </div>
                  <v-col cols="3" sm="2" md="2">
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.telNumber1"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                  <div v-if="employeeEditFlag" class="to-edit-label">-</div>
                  <v-col cols="3" sm="2" md="2">
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.telNumber2"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                  <div v-if="employeeEditFlag" class="to-edit-label">-</div>
                  <v-col cols="3" sm="2" md="2">
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.telNumber3"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">ログインID</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ employeeEditItem.loginId }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.loginId"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">パスワード</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ employeeEditItem.password }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-text-field
                        v-model="employeeEditItem.password"
                        label=""
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">所属期間</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ displayDateFormat(employeeEditItem.entryFirstDate) }}～{{
                        displayDateFormat(employeeEditItem.entryEndDate)
                      }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-menu
                        ref="entryFirstMenu"
                        v-model="entryFirstMenu"
                        :close-on-content-click="false"
                        :return-value.sync="entryFirstMenu"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="displayDateFormat(employeeEditItem.entryFirstDate)"
                            placeholder="まず20XX年X月をクリック"
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
                          v-model="employeeEditItem.entryFirstDate"
                          no-title
                          scrollable
                          locale="jp-ja"
                          :day-format="(date) => new Date(date).getDate()"
                        >
                          <v-btn
                              color="#ff6669" class="white--text" rounded
                              @click="
                              $refs.entryFirstMenu.save(
                                employeeEditItem.birthday
                              )"
                          >
                            OK
                          </v-btn>
                          <v-btn
                            class="#f5f5f5" rounded
                            @click="entryFirstMenu = false"
                          >
                            キャンセル
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                      <div class="to-label">
                        <v-menu
                          ref="entryEndMenu"
                          v-model="entryEndMenu"
                          :close-on-content-click="false"
                          :return-value.sync="entryEndMenu"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="displayDateFormat(employeeEditItem.entryEndDate)"
                              placeholder="まず20XX年X月をクリック"
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
                            v-model="employeeEditItem.entryEndDate"
                            no-title
                            scrollable
                            locale="jp-ja"
                            :day-format="(date) => new Date(date).getDate()"
                          >
                            <v-btn
                                color="#ff6669" class="white--text" rounded
                                @click="
                                $refs.entryEndMenu.save(
                                  employeeEditItem.birthday
                                )"
                            >
                              OK
                            </v-btn>
                            <v-btn
                              class="#f5f5f5" rounded
                              @click="entryEndMenu = false"
                            >
                              キャンセル
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">雇用形態</div>
                  </v-col>
                  <v-col cols="2">
                    <div v-if="employeeEditFlag" class="item-required">
                      <v-chip color="red" dark>必須</v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <div v-if="!employeeEditFlag" class="dialog-label">
                      {{ employeeEditItem.employmentName }}
                    </div>
                    <div v-if="employeeEditFlag">
                      <v-radio-group v-model="employeeEditItem.employment" row>
                        <v-radio label="正規" value="0" color="#ff6669"></v-radio>
                        <v-radio label="非正規" value="1" color="#ff6669"></v-radio>
                        <v-radio label="委託" value="2" color="#ff6669"></v-radio>
                        <v-radio label="派遣" value="3" color="#ff6669"></v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <div class="item-title">保有資格</div>
                  </v-col>
                  <v-col cols="2">
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <ul>
                      <li v-for="(item, index) in employeeEditItem.license" :key="index">
                        <div v-if="!employeeEditFlag" class="dialog-label">
                          {{item}}
                        </div>
                        <v-text-field
                          v-if="employeeEditFlag"
                          v-model="employeeEditItem.license[index]"
                          outlined
                          name="licenseName"
                          label="資格名"
                        ></v-text-field>
                      </li>
                    </ul>
                      <v-btn
                        v-if="employeeEditFlag && employeeEditItem.license.length <= 9"
                        color="#ff6669"
                        class="white--text"
                        fab
                        @click="onTouchPlusBtn()"
                        ><v-icon>mdi-plus-thick</v-icon></v-btn
                      >
                      <v-btn
                        v-if="employeeEditFlag && employeeEditItem.license.length != 1"
                        color="#00ffd0"
                        elevation="3"
                        outlined
                        fab
                        @click="onTouchDeleteBtn()"
                        ><v-icon>mdi-delete-empty</v-icon>
                      </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onClickEmployeeEditBtn()" color="#ff6669" elevation="3" outlined rounded>
                {{employeeEditBtnName}}
              </v-btn>
              <v-btn @click="onClickEmployeeCancelBtn()" class="#f5f5f5" rounded
                >{{employeeCancelBtnName}}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- 従業員削除確認ダイアログ -->
        <v-dialog v-model="employeeDeleteConfirmDialog" max-width="500px">
          <v-card>
            <v-card-title align="center"
              >この社員を削除しますか?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onClickDeleteEmployee">
                OK
              </v-btn>
              <v-btn color="white" @click="employeeDeleteConfirmDialog = false">
                キャンセル
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- 役職削除確認ダイアログ -->
        <v-dialog v-model="postDeleteConfirmDialog" max-width="500px">
          <v-card>
            <v-card-title align="center"
              >この役職を削除しますか?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onClickDeletePost">
                OK
              </v-btn>
              <v-btn color="white" @click="postDeleteConfirmDialog = false"> キャンセル </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- 役職編集・追加ダイアログ -->
        <v-dialog v-model="postDialog" persistent max-width="1200px">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{ postDialogName }}
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
                      v-model="postEditItem.postName"
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
                      v-model="postEditItem.attendanceAuth"
                      item-text="label"
                      item-value="value"
                      label="権限を選択"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="2"
                    ><v-select
                      :items="postPermissionList"
                      v-model="postEditItem.ownWokerManageAuth"
                      item-text="label"
                      item-value="value"
                      label="権限を選択"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="2"
                    ><v-select
                      :items="postPermissionList"
                      v-model="postEditItem.subCompanyManageAuth"
                      item-text="label"
                      item-value="value"
                      label="権限を選択"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="2"
                    ><v-select
                      :items="postPermissionList"
                      v-model="postEditItem.ownCompanyManageAuth"
                      item-text="label"
                      item-value="value"
                      label="権限を選択"
                      solo
                    ></v-select> </v-col
                  ><v-col cols="2"
                    ><v-select
                      :items="postPermissionList"
                      v-model="postEditItem.payPlanAuth"
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
                <v-btn @click="onClickPostEditBtn()" color="#ff6669" elevation="3" outlined rounded>
                  保存
                </v-btn>
                <v-btn @click="onClickPostCancelBtn()" class="#f5f5f5" rounded
                  >閉じる</v-btn
                >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export default {
  name: 'ownWorkerAll',
  components: {
  },
  data: () => ({
    //* * 自社員一覧 */ 
    employeeList: [],
    postList: [],
    selectPostList: [],
    employeeEditItem: [],
    employeeDialog: false,
    employeeDialogName: '自社員追加',
    employeeEditFlag: false,
    employeeEditBtnName: '編集',
    employeeCancelBtnName: 'キャンセル',
    deleteEmployeeItem: [],
    employeeDeleteConfirmDialog: false,
    search: '',
    //* * 役職一覧 */ 
    postEditItem: [],
    postDialog: false,
    postDialogName: '役職追加',
    deletePostItem: [],
    postDeleteConfirmDialog: false,
    birthdayMenu: false,
    entryFirstMenu: false,
    entryEndMenu: false,
    postPermissionList: [{value: 2, label: '✕'}, {value: 1, label: '閲覧のみ'}, {value: 0, label: '全て'}],
    // 入力チェック
    firstnameRules: [
      v => !!v || '姓が未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    LastnameRules: [
      v => !!v || '名が未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    codeRules: [
      v => v.length <= 8 || `文字数は8文字以内です`
    ],
    addressRules: [
      v => v.length <= 100 || `文字数は100文字以内です`
    ],
    mailRules: [
      v => v.length <= 100 || `文字数は100文字以内です`
    ],
    tellNumberOneRules: [
      v => v.length <= 3 || `文字数は3文字以内です`
    ],
    tellNumberTwoRules: [
      v => v.length <= 4 || `文字数は4文字以内です`
    ],
    tellNumberThreeRules: [
      v => v.length <= 4 || `文字数は4文字以内です`
    ],
    loginIdRules: [
      v => !!v || 'ログインIDが未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    passwordRules: [
      v => !!v || 'パスワードが未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
  }),
  mounted: function () {
    // 自社員管理の画面情報をとってきます。
    this.getEmployeeInfo()
  },
  computed: {
    /** v-tableのヘッダーを設定 */
    ownWorkerHeader () {
      return [
        {
          text: '職員名',
          align: 'center',
          sortable: false,
          value: 'employeeName',
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
          value: 'selectPost.postName',
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
          value: 'attendanceAuthName',
          align: 'center',
          width: '14%'
        },
        {
          text: '自社員管理',
          value: 'ownWokerManageAuthName',
          align: 'center',
          width: '14%'
        },
        {
          text: '協力会社管理',
          value: 'subCompanyManageAuthName',
          align: 'center',
          width: '14%'
        },
        {
          text: '自社設定',
          value: 'ownCompanyManageAuthName',
          align: 'center',
          width: '14%'
        },
        {
          text: 'プラン・支払い',
          value: 'payPlanAuthName',
          align: 'center',
          width: '14%'
        },
        { text: '削除', value: 'delete', sortable: false, align: 'right', width: '14%' }
      ]
    },
    
  },
  methods: {
        
    //* * 共通 */ 

    // 初期表示処理です。
    async getEmployeeInfo () {
      let response = await Methods.getEmployeeInfo()
      // レスポンスから画面情報をセットする
      this.employeeList = createEmployeeList(response)
      this.postList = createPostList(response)
      this.selectPostList = createSelectPostList(response)
    },
    // 日付のフォーマット処理です。
    displayDateFormat(date) {
      return dayjs(date).format("YYYY/MM/DD");
    },
    
    //* * 自社員一覧 */ 

    // 自社員ダイアログの表示
    showEditEmployee (item) {
      // 編集の場合
      if(item !== undefined){
        this.employeeEditItem = item
        this.employeeDialogName = '自社員編集'
        this.employeeEditFlag = false;
        this.employeeEditBtnName = '編集';
        this.employeeCancelBtnName = '閉じる';
      // 追加の場合
      }else{
        // 入力項目に初期値を設定
        this.employeeEditItem = {
          employeeId : '',
          license: [""],
          employment: 0,
          employmentName: '正規'
        }
        this.employeeDialogName = '自社員追加'
        // 新規の場合は、入力画面のみ表示
        this.employeeEditFlag = true;
        this.employeeEditBtnName = '保存';
        this.employeeCancelBtnName = '閉じる';
      }
      this.employeeDialog = true
    },
    // 自社員ダイアログの編集・保存ボタン処理です。
    async onClickEmployeeEditBtn () {
      if(this.employeeEditFlag){
        const param = {
          employeeId: this.employeeEditItem.employeeId,
          loginId: this.employeeEditItem.loginId,
          password: this.employeeEditItem.password,
          employeeFirstname: this.employeeEditItem.employeeFirstname,
          employeeLastname: this.employeeEditItem.employeeLastname,
          postId: this.employeeEditItem.selectPost.postId,
          companyName: this.employeeEditItem.companyName,
          staffCode: this.employeeEditItem.staffCode,
          birthday: this.employeeEditItem.birthday,
          address: this.employeeEditItem.address,
          mailAddress: this.employeeEditItem.mailAddress,
          telNumber1: this.employeeEditItem.telNumber1,
          telNumber2: this.employeeEditItem.telNumber2,
          telNumber3: this.employeeEditItem.telNumber3,
          entryFirstDate: this.employeeEditItem.entryFirstDate,
          entryEndDate: this.employeeEditItem.entryEndDate,
          employment: this.employeeEditItem.employment,
          license: this.employeeEditItem.license,
          createUserId: '', // TODO ログインユーザのユーザIDをセットする(新規の時だけ)
          updateUserId: '' // TODO ログインユーザのユーザIDをセットする
        }
        // 保存処理
        let response = await Methods.saveEmployee(param)
        // レスポンスから画面情報をセットする
        this.employeeList = createEmployeeList(response)
        this.postList = createPostList(response)
        this.selectPostList = createSelectPostList(response)
        this.employeeEditFlag = false
        this.employeeDialog = false
        // 保存完了メッセージ表示
        this.$emit('alertMethod', response);
        // console.log(response)
      }else{
        this.employeeEditBtnName = '保存';
        this.employeeCancelBtnName = '戻る';
        this.employeeEditFlag = !this.employeeEditFlag
      }
    },
    // 自社員ダイアログの閉じる・戻るボタン処理です。
    onClickEmployeeCancelBtn () {
      // 新規の場合、戻るがないので閉じます。
      if(this.employeeEditItem.employeeId === ''){
        this.employeeEditFlag = false;
        this.employeeDialog = false;
      }else if(this.employeeEditFlag){
        this.employeeEditBtnName = '編集';
        this.employeeCancelBtnName = '閉じる';
        this.employeeEditFlag = !this.employeeEditFlag
      }else{
        this.employeeDialog = false;
      }
    },
    // 自社員ダイアログの資格プラスボタン押下時の処理です。
    onTouchPlusBtn () {
      this.employeeEditItem.license.push("")
    },
    // 自社員ダイアログの資格削除ボタン押下時の処理です。
    onTouchDeleteBtn () {
      this.employeeEditItem.license.pop()
    },
    // 削除確認処理(自社員)
    showDeleteEmployeeConfirm (item) {
      this.deleteEmployeeItem.employeeId = item.employeeId;
      this.employeeDeleteConfirmDialog = true;
    },
    // 削除ボタン押下処理(自社員)
    async onClickDeleteEmployee () {
      const param = {
        employeeId: this.deleteEmployeeItem.employeeId
      }
      // 削除処理
      let response = await Methods.deleteEmployee(param)
      // レスポンスから画面情報をセットする
      this.employeeList = createEmployeeList(response)
      this.postList = createPostList(response)
      this.selectPostList = createSelectPostList(response)
      this.employeeDeleteConfirmDialog = false;
      // 削除完了メッセージ表示
      this.$emit('alertMethod', response);
    },
    // 自社員の検索処理です。
    filterOnlyCapsText (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    // TODO 社員一覧ダウンロード処理
    download (format) {
      console.log(format)
    },
        
    //* * 役職一覧 */ 
        
    // 役職ダイアログの表示
    showEditPost (item) {
      // 編集の場合
      if(item !== undefined){
        this.postEditItem = item
        this.postDialogName = '役職編集'
      // 追加の場合
      }else{
        // 入力項目に初期値を設定
        this.postEditItem = {
          postId: '',
        }
        this.postDialogName = '役職追加'
      }
      this.postDialog = true
    },
    // 役職ダイアログの編集・保存ボタン処理です。
    async onClickPostEditBtn () {
      const param = {
        postId: this.postEditItem.postId,
        postName: this.postEditItem.postName,
        attendanceAuth: this.postEditItem.attendanceAuth,
        ownWokerManageAuth: this.postEditItem.ownWokerManageAuth,
        subCompanyManageAuth: this.postEditItem.subCompanyManageAuth,
        ownCompanyManageAuth: this.postEditItem.ownCompanyManageAuth,
        payPlanAuth: this.postEditItem.payPlanAuth,
        createUserId: '', // TODO ログインユーザのユーザIDをセットする(新規の時だけ)
          updateUserId: '' // TODO ログインユーザのユーザIDをセットする
      }
      // 保存処理
      let response = await Methods.savePost(param)
      // レスポンスから画面情報をセットする
      this.employeeList = createEmployeeList(response)
      this.postList = createPostList(response)
      this.selectPostList = createSelectPostList(response)
      this.postDialog = false
      // 保存完了メッセージ表示
      this.$emit('alertMethod', response);
    },
    // 役職ダイアログの閉じる・戻るボタン処理です。
    onClickPostCancelBtn () {
      // 新規の場合、戻るがないので閉じます。
      if(this.postEditItem.employeeId === ''){
        this.postEditFlag = false;
        this.postDialog = false;
      }else if(this.postEditFlag){
        this.postEditBtnName = '編集';
        this.postCancelBtnName = '閉じる';
        this.postEditFlag = !this.postEditFlag
      }else{
        this.postDialog = false;
      }
    },
    // 削除確認処理(役職)
    showDeletePostConfirm (item) {
      this.deletePostItem.postId = item.postId;
      this.postDeleteConfirmDialog = true;
    },
    // 削除ボタン押下処理(役職)
    async onClickDeletePost () {
      const param = {
        postId: this.deletePostItem.postId
      }
      // 削除処理
      let response = await Methods.deletePost(param)
      // レスポンスから画面情報をセットする
      this.employeeList = createEmployeeList(response)
      this.postList = createPostList(response)
      this.selectPostList = createSelectPostList(response)
      this.postDeleteConfirmDialog = false;
      // 削除完了メッセージ表示
      this.$emit('alertMethod', response);
    },
  }
}
//
// privateメソッドです。
//
/**
 * レスポンスをもとに画面情報(自社員)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createEmployeeList (response) {
  var employeeResponse = response.data.employeeResponse
  var postResponse = response.data.postResponse
  // 自社員一覧表示用に変換します。
  var employeeList = []
  for (var i = 0; i < employeeResponse.length; i++) {
    var employee = {}
    employee.employeeId = employeeResponse[i].objectId
    employee.loginId = employeeResponse[i].loginId
    employee.password = employeeResponse[i].password
    employee.employeeName = employeeResponse[i].employeeFirstname + employeeResponse[i].employeeLastname
    employee.employeeFirstname = employeeResponse[i].employeeFirstname
    employee.employeeLastname = employeeResponse[i].employeeLastname
    employee.companyName = "テスト会社" // TODO 方針未定
    // 選択中の役職を設定
    employee.selectPost = {
      postId: employeeResponse[i].postId,
      postName: getPostName(
        employeeResponse[i].postId,
        postResponse
      )
    }
    employee.staffCode = employeeResponse[i].staffCode
    employee.birthday = employeeResponse[i].birthday// 日付
    employee.address = employeeResponse[i].address
    employee.mailAddress = employeeResponse[i].mailAddress
    employee.telNumber1 = employeeResponse[i].telNumber1// カラム追加
    employee.telNumber2 = employeeResponse[i].telNumber2// カラム追加
    employee.telNumber3 = employeeResponse[i].telNumber3// カラム追加
    employee.entryFirstDate = employeeResponse[i].entryFirstDate// 日付
    employee.entryEndDate = employeeResponse[i].entryEndDate// 日付
    employee.employment = String(employeeResponse[i].employment)
    employee.employmentName = getEmploymentName(employeeResponse[i].employment)
    employee.license = employeeResponse[i].license// 配列
    employee.createUserId = employeeResponse[i].createUserId
    employee.updateUserId = employeeResponse[i].updateUserId
    employeeList.push(employee)
  }

  return employeeList
}
/**
 * レスポンスをもとに画面情報(役職)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createPostList (response) {
  var postResponse = response.data.postResponse
  // 役職一覧表示用に変換します。
  var postList = []
  for (var i = 0; i < postResponse.length; i++) {
    var post = {}
    post.postId = postResponse[i].objectId
    post.postName = postResponse[i].postName
    post.attendanceAuth = postResponse[i].attendanceAuth
    post.ownWokerManageAuth = postResponse[i].ownWokerManageAuth
    post.subCompanyManageAuth = postResponse[i].subCompanyManageAuth
    post.ownCompanyManageAuth = postResponse[i].ownCompanyManageAuth
    post.payPlanAuth = postResponse[i].payPlanAuth
    post.attendanceAuthName = getAutnName(postResponse[i].attendanceAuth)
    post.ownWokerManageAuthName = getAutnName(postResponse[i].ownWokerManageAuth)
    post.subCompanyManageAuthName = getAutnName(postResponse[i].subCompanyManageAuth)
    post.ownCompanyManageAuthName = getAutnName(postResponse[i].ownCompanyManageAuth)
    post.payPlanAuthName = getAutnName(postResponse[i].payPlanAuth)
    post.createUserId = postResponse[i].createUserId
    post.updateUserId = postResponse[i].updateUserId
    postList.push(post)
  }

  return postList
}
/**
 * レスポンスをもとに画面情報(役職名セレクトボックス)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createSelectPostList (response) {
  var postResponse = response.data.postResponse
  var postList = []
  for (var j = 0; j < postResponse.length; j++) {
    var post = {}
    post.postId = postResponse[j].objectId
    post.postName = postResponse[j].postName
    postList.push(post)
  }
  return postList
}
/**
 * 役職IDをもとに役職名を取得します。
 *
 * @param {string} postId 役職IDです。
 * @param {object} postResponse 役職のレスポンスデータです。
 *
 * @private
 * @returns
 */
function getPostName (postId, postResponse) {
  var postName = ''
  for (var k = 0; k < postResponse.length; k++) {
    if (postId === postResponse[k].objectId) {
      postName = postResponse[k].postName
    }
  }
  return postName
}
/**
 * 権限をもとに権限名を取得します。
 *
 * @param {string} auth 権限です。
 *
 * @private
 * @returns
 */
function getAutnName (auth) {
  if (auth === 0) {
    return '全て'
  } else if(auth === 1){
    return '閲覧のみ'
  }else{
    return '×'
  }
}
/**
 * 権限をもとに権限名を取得します。
 *
 * @param {string} employment 権限です。
 *
 * @private
 * @returns
 */
function getEmploymentName (employment) {
  if (employment === 0) {
    return '正規'
  } else if(employment === 1){
    return '非正規'
  } else if(employment === 2){
    return '委託'
  } else if(employment === 3){
    return '派遣'
  }else{
    return ''
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
.to-edit-label {
  line-height: 70px;
}
.to-label {
  line-height: 45px;
}
.dialog-label {
  text-align: left;
  line-height: 60px;
}
.dialog-to-label {
  padding-left: 12px;
  line-height: 80px;
}
</style>
