<template>
  <v-app id="subCompanyAll">
<!-- 協力会社一覧 -->
    <v-card>
      <v-container>
        <h2>協力会社一覧</h2>
        <v-sheet color="white" rounded outlined>
          <v-row align="center">
            <v-col cols="12" sm="4" md="2"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 協力会社を追加するダイアログ表示ボタン -->
              <v-row justify="center">
                <v-btn
                  @click="showEditSubCompany()"
                  outlined
                  elevation="3"
                >
                  協力会社を追加
                  <v-icon color="#ff6669">mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-row align="center">
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="subCompanyHeader"
              :items="subCompanyList"
              :search="subCompanySearch"
              :custom-filter="filterOnlyCapsText"
              item-key="name"
              class="elevation-1 table"
              height="300"
              @click:row="showEditSubCompany"
            >
              <template v-slot:top>
                <v-row>
                  <v-col cols="4">
                    <!-- 検索窓 -->
                    <v-text-field
                      v-model="subCompanySearch"
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
                  @click.stop="showDeleteSubCompanyConfirm(item)"
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
<!-- 協力会社員一覧 -->
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
              <v-btn
                @click="showEditSubCompanyEmployee()"
                outlined
                elevation="3"
              >
                社員を追加
                <v-icon color="#ff6669">mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center">
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="subWorkerHeader"
              :items="subEmployeeList"
              :search="subEmployeeSearch"
              :custom-filter="filterOnlyCapsText"
              item-key="name"
              class="elevation-1 table"
              height="300"
              @click:row="showEditSubCompanyEmployee"
            >
              <template v-slot:top>
                <v-row>
                  <v-col cols="4">
                    <!-- 検索窓 -->
                    <v-text-field
                      v-model="subEmployeeSearch"
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
                  @click.stop="showDeleteSubEmployeeConfirm(item)"
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
<!-- 協力会社編集ダイアログ -->
        <v-dialog v-model="subCompanyDialog" persistent max-width="600px">
          <v-card>
            <v-card-title class="text-h6 grey lighten-2">
              {{subCompanyDialogName}}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">会社名</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subCompanyEditFlag" class="dialog-label">
                    {{ subCompanyEditItem.subCompanyName }}
                  </div>
                  <div v-if="subCompanyEditFlag">
                    <v-text-field v-model="subCompanyEditItem.subCompanyName" :rules="companyRules" label="(例)株式会社ABC" maxlength='50' clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">設立</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subCompanyEditFlag" class="dialog-label">
                    {{ displayDateFormat(subCompanyEditItem.foundation) }}
                  </div>
                  <div v-if="subCompanyEditFlag">
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
                          :value="displayDateFormat(subCompanyEditItem.foundation)"
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
                        v-model="subCompanyEditItem.foundation"
                        no-title
                        scrollable
                        locale="jp-ja"
                        :day-format="(date) => new Date(date).getDate()"
                      >
                        <v-btn
                            color="#ff6669" class="white--text" rounded
                            @click="
                            $refs.foundationMenu.save(
                              subCompanyEditItem.birthday
                            )"
                        >
                          OK
                        </v-btn>
                        <v-btn
                          class="#f5f5f5" rounded
                          @click="foundationMenu = false"
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
                  <div class="item-title">代表者</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subCompanyEditFlag" class="dialog-label">
                    {{ subCompanyEditItem.leaderName }}
                  </div>
                  <div v-if="subCompanyEditFlag">
                    <v-text-field
                      v-model="subCompanyEditItem.leaderName"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">郵便番号</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <div v-if="!subCompanyEditFlag" class="dialog-to-label">
                  {{ subCompanyEditItem.postNumber1 + "-" + subCompanyEditItem.postNumber2 }}
                </div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subCompanyEditFlag">
                    <v-text-field
                      v-model="subCompanyEditItem.postNumber1"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
                <div v-if="subCompanyEditFlag" class="to-edit-label">-</div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subCompanyEditFlag">
                    <v-text-field
                      v-model="subCompanyEditItem.postNumber2"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">住所</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subCompanyEditFlag" class="dialog-label">
                  {{ subCompanyEditItem.address }}
                  </div>
                  <div v-if="subCompanyEditFlag">
                    <v-text-field
                      v-model="subCompanyEditItem.address"
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
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <div v-if="!subCompanyEditFlag" class="dialog-to-label">
                  {{ subCompanyEditItem.telNumber1 + "-" + subCompanyEditItem.telNumber2 + "-" + subCompanyEditItem.telNumber3}}
                </div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subCompanyEditFlag">
                    <v-text-field
                      v-model="subCompanyEditItem.telNumber1"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
                <div v-if="subCompanyEditFlag" class="to-edit-label">-</div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subCompanyEditFlag">
                    <v-text-field
                      v-model="subCompanyEditItem.telNumber2"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
                <div v-if="subCompanyEditFlag" class="to-edit-label">-</div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subCompanyEditFlag">
                    <v-text-field
                      v-model="subCompanyEditItem.telNumber3"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">工種</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <v-col>
                  <div v-if="!subCompanyEditFlag" class="dialog-label">
                    <div v-for="(item, index) in subCompanyEditItem.workTypeIdList" :key="index">
                        {{item.workTypeName}}
                    </div>
                  </div>
                  <div v-if="subCompanyEditFlag">
                    <v-select
                      v-model="subCompanyEditItem.workTypeIdList[0]"
                      item-text="workTypeName"
                      item-value="value"
                      return-object
                      :items="workTypePullDown"
                      label="工種を選択してください。"
                      solo
                      name="workType"
                    ></v-select>
                    <v-select
                      v-if="subCompanyEditItem.workTypeIdList.length >= 2"
                      v-model="subCompanyEditItem.workTypeIdList[1]"
                      item-text="workTypeName"
                      item-value="value"
                      return-object
                      :items="workTypePullDown"
                      label="工種を選択してください。"
                      solo
                      name="workType"
                    ></v-select>
                    <v-select
                      v-if="subCompanyEditItem.workTypeIdList.length >= 3"
                      v-model="subCompanyEditItem.workTypeIdList[2]"
                      item-text="workTypeName"
                      item-value="value"
                      return-object
                      :items="workTypePullDown"
                      label="工種を選択してください。"
                      solo
                      name="workType"
                    ></v-select>
                    <v-select
                      v-if="subCompanyEditItem.workTypeIdList.length >= 4"
                      v-model="subCompanyEditItem.workTypeIdList[3]"
                      item-text="workTypeName"
                      item-value="value"
                      return-object
                      :items="workTypePullDown"
                      label="工種を選択してください。"
                      solo
                      name="workType"
                    ></v-select>
                    <v-select
                      v-if="subCompanyEditItem.workTypeIdList.length >= 5"
                      v-model="subCompanyEditItem.workTypeIdList[4]"
                      item-text="workTypeName"
                      item-value="value"
                      return-object
                      :items="workTypePullDown"
                      label="工種を選択してください。"
                      solo
                      name="workType"
                    ></v-select>
                  </div>
                </v-col>
              </v-row>
              <v-row v-if="subCompanyEditFlag">
                <v-col cols="9"></v-col>
                <v-col cols="1">
                  <v-btn
                    v-if="subCompanyEditItem.workTypeIdList.length <= 4"
                    color="#ff6669"
                    class="white--text"
                    fab
                    small
                    @click="onTouchWorkTypePlusBtn()"
                    ><v-icon large>mdi-plus-thick</v-icon></v-btn
                  >
                </v-col>
                <v-col cols="1">
                  <v-btn
                    v-if="subCompanyEditItem.workTypeIdList.length != 1"
                    color="#00ffd0"
                    elevation="3"
                    outlined
                    fab
                    small
                    @click="onTouchWorkTypeDeleteBtn()"
                    ><v-icon large>mdi-delete-empty</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">備考</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subCompanyEditFlag" class="item-required">
                    <v-chip color="white" dark>必須</v-chip>
                  </div>
                </v-col>
                <v-col>
                  <div v-if="!subCompanyEditFlag" class="dialog-label">
                    {{ subCompanyEditItem.note }}
                    </div>
                    <div v-if="subCompanyEditFlag">
                      <v-textarea v-model="subCompanyEditItem.note" :rules="noteRules" maxlength="501" clearable clear-icon="mdi-close-circle" outlined required></v-textarea>
                  </div>
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
                @click="onClickSubCompanyEditBtn()"
              >
                {{subCompanyEditBtnName}}
              </v-btn>
              <v-btn
                @click="onClickSubCompanyCancelBtn()"
                class="#f5f5f5"
                rounded
              >
                {{subCompanyCancelBtnName}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- 協力会社削除確認ダイアログ -->
        <v-dialog v-model="subCompanyDeleteConfirmDialog" max-width="500px">
          <v-card>
            <v-card-title align="center"
              >この協力会社を削除しますか?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onClickDeleteSubCompany">
                OK
              </v-btn>
              <v-btn color="white" @click="subCompanyDeleteConfirmDialog = false"> キャンセル </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- 協力会社員編集ダイアログ -->
        <v-dialog v-model="subEmployeeDialog" persistent max-width="600px">
          <v-card>
            <v-card-title class="text-h6 grey lighten-2">
              {{subEmployeeDialogName}}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">所属会社</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subEmployeeEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ subEmployeeEditItem.subCompanyName}}
                  </div>
                  <div v-if="subEmployeeEditFlag">
                    <v-select
                      v-model="subEmployeeEditItem.selectSubCompanyList"
                      item-text="subCompanyName"
                      item-value="value"
                      return-object
                      :items="subCompanyPullDown"
                      label="協力会社を選択してください。"
                      solo
                      name="subCompanyName"
                    ></v-select>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">名前</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subEmployeeEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip></div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ subEmployeeEditItem.employeeName}}
                  </div>
                  <div v-if="subEmployeeEditFlag">
                    <v-col>
                      <v-text-field v-model="subEmployeeEditItem.employeeFirstname" :rules="employeeFirstnameRules" label="名前(姓)" maxlength="25" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="subEmployeeEditItem.employeeLastname" :rules="employeeLastnameRules" label="名前(名)" maxlength="25" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                    </v-col>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">職員コード</div>
                </v-col>
                <v-col cols="2">
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ subEmployeeEditItem.staffCode}}
                  </div>
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field v-model="subEmployeeEditItem.staffCode" :rules="staffCodeRules" label="(例)001" maxlength="8" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">生年月日</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subEmployeeEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip></div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ displayDateFormat(subEmployeeEditItem.birthday) }}
                  </div>
                  <div v-if="subEmployeeEditFlag">
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
                          :value="displayDateFormat(subEmployeeEditItem.birthday)"
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
                        v-model="subEmployeeEditItem.birthday"
                        no-title
                        scrollable
                        locale="jp-ja"
                        :day-format="(date) => new Date(date).getDate()"
                      >
                        <v-btn
                            color="#ff6669" class="white--text" rounded
                            @click="
                            $refs.birthdayMenu.save(
                              subEmployeeEditItem.birthday
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
                  <div v-if="subEmployeeEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip></div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ subEmployeeEditItem.address}}
                  </div>
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field  v-model="subEmployeeEditItem.address" :rules="addressRules" label="(例)千葉県宛間市宛間123-4" maxlength="100" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">Mail</div>
                </v-col>
                <v-col cols="2">
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ subEmployeeEditItem.mailAddress}}
                  </div>
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field  v-model="subEmployeeEditItem.mailAddress" :rules="mailAddressRules" label="(例)abc@example.com" maxlength="50" clearable clear-icon="mdi-close-circle" outlined></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">電話番号</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subEmployeeEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip>
                  </div>
                </v-col>
                <div v-if="!subEmployeeEditFlag" class="dialog-to-label">
                  {{ subEmployeeEditItem.telNumber1 + "-" + subEmployeeEditItem.telNumber2 + "-" + subEmployeeEditItem.telNumber3}}
                </div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field
                      v-model="subEmployeeEditItem.telNumber1"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
                <div v-if="subEmployeeEditFlag" class="to-edit-label">-</div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field
                      v-model="subEmployeeEditItem.telNumber2"
                      label=""
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </v-col>
                <div v-if="subEmployeeEditFlag" class="to-edit-label">-</div>
                <v-col cols="3" sm="2" md="2">
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field
                      v-model="subEmployeeEditItem.telNumber3"
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
                  <div v-if="subEmployeeEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip></div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ subEmployeeEditItem.loginId}}
                  </div>
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field v-model="subEmployeeEditItem.loginId" :rules="employeeIdRules" label="(例)abc001" maxlength="50" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">パスワード</div>
                </v-col>
                <v-col cols="2">
                  <div v-if="subEmployeeEditFlag" class="item-required">
                    <v-chip color="red" dark>必須</v-chip></div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <div v-if="!subEmployeeEditFlag" class="dialog-label">
                    {{ subEmployeeEditItem.password}}
                  </div>
                  <div v-if="subEmployeeEditFlag">
                    <v-text-field v-model="subEmployeeEditItem.password" :rules="passwordRules" label="※半角英数字" maxlength="50" clearable clear-icon="mdi-close-circle" outlined required></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <div class="item-title">保有資格</div>
                </v-col>
                <v-col cols="2"></v-col>
                <v-col cols="12" sm="6" md="6">
                  <ul>
                    <li v-for="(item, index) in subEmployeeEditItem.license" :key="index">
                      <div v-if="!subEmployeeEditFlag" class="dialog-label">
                        {{item}}
                      </div>
                      <v-text-field
                        v-if="subEmployeeEditFlag"
                        v-model="subEmployeeEditItem.license[index]"
                        outlined
                        name="licenseName"
                        label="資格名"
                      ></v-text-field>
                    </li>
                  </ul>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="9"></v-col>
                  <v-col cols="1">
                    <v-btn
                      v-if="subEmployeeEditFlag && subEmployeeEditItem.license.length <= 3"
                      color="#ff6669"
                      class="white--text"
                      fab
                      small
                      @click="onTouchLicensePlusBtn()"
                      ><v-icon>mdi-plus-thick</v-icon></v-btn
                    >
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      v-if="subEmployeeEditFlag && subEmployeeEditItem.license.length != 1"
                      color="#00ffd0"
                      elevation="3"
                      outlined
                      fab
                      small
                      @click="onTouchLicenseDeleteBtn()"
                      ><v-icon>mdi-delete-empty</v-icon>
                    </v-btn>
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
                @click="onClickSubEmployeeEditBtn()"
              >
                {{subEmployeeEditBtnName}}
              </v-btn>
              <v-btn
                @click="onClickSubEmployeeCancelBtn()"
                class="#f5f5f5"
                rounded
              >
                {{subEmployeeCancelBtnName}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- 協力会社員削除確認ダイアログ -->
        <v-dialog v-model="subEmployeeDeleteConfirmDialog" max-width="500px">
          <v-card>
            <v-card-title align="center"
              >この協力会社員を削除しますか?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onClickDeleteSubEmployee">
                OK
              </v-btn>
              <v-btn color="white" @click="subEmployeeDeleteConfirmDialog = false"> キャンセル </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export default {
  name: 'subCompanyAll',
  data: () => ({
    // TODO ログイン認証処理が完了したら、画面で持ってるemployeeIDをセットする
    userId: '6tQPHzHQwlGErXeLSzt1',
    // ※現在(2022/03/01)は、契約が一社のため、固定でIDを設定
    // ※複数社契約になった場合、セッションで契約IDを保持して、
    // ※そのIDをもとに検索するように修正
    contractorId: '00000001',
    //* * 協力会社一覧 */ 
    subCompanyList: [],
    workTypePullDown: [],
    subCompanyDialog: false,
    subCompanyEditItem: false,
    subCompanyDialogName: '協力会社追加',
    subCompanyEditFlag: false,
    subCompanyEditBtnName: '編集',
    subCompanyCancelBtnName: '閉じる',
    subCompanyDeleteConfirmDialog: false,
    deleteSubcompanyItem: [],
    subCompanySearch: '',
    //* * 協力会社員一覧 */ 
    subEmployeeList: [],
    subCompanyPullDown: [],
    subEmployeeDialog: false,
    subEmployeeEditItem: false,
    subEmployeeDialogName: '協力会社員追加',
    subEmployeeEditFlag: false,
    subEmployeeEditBtnName: '編集',
    subEmployeeCancelBtnName: '閉じる',
    subEmployeeDeleteConfirmDialog: false,
    deleteSubEmployeeItem: [],
    foundationMenu: false,
    birthdayMenu: false,
    subEmployeeSearch: '',
    // 入力チェック
    companyRules: [
      v => !!v || '会社名が未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    foundationRules: [
      v => !!v || '設立日が未入力です',
      v => (!!v && v.length <= 10) || `文字数は10文字以内です`
    ],
    leaderRules: [
      v => !!v || '代表者名が未入力です',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    postNumberFirstRules: [
      v => !!v || '郵便番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 3) || `文字数は3文字以内です`
    ],
    postNumberLastRules: [
      v => !!v || '郵便番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    addressRules: [
      v => !!v || '住所が未入力です',
      v => (!!v && v.length <= 100) || `文字数は100文字以内です`
    ],
    telNumberOneRules: [
      v => !!v || '電話番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    telNumberTwoRules: [
      v => !!v || '電話番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    telNumberThreeRules: [
      v => !!v || '電話番号が未入力です',
      v => /^[0-9]*$/.test(v) || '入力は半角数字のみです',
      v => (!!v && v.length <= 4) || `文字数は4文字以内です`
    ],
    noteRules: [],
    employeeFirstnameRules: [
      v => !!v || '姓が未入力です',
      v => (!!v && v.length <= 25) || `文字数は25文字以内です`
    ],
    employeeLastnameRules: [
      v => !!v || '名が未入力です',
      v => (!!v && v.length <= 25) || `文字数は25文字以内です`
    ],
    staffCodeRules: [],
    birthdayRules: [
      v => !!v || '生年月日が未入力です'
    ],
    mailAddressRules: [],
    employeeIdRules: [
      v => !!v || 'ログインIDが未入力です',
      v => /^[A-Za-z0-9]*$/.test(v) || '',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    passwordRules: [
      v => !!v || 'パスワードが未入力です',
      v => /^[A-Za-z0-9]*$/.test(v) || '',
      v => (!!v && v.length <= 50) || `文字数は50文字以内です`
    ],
    licenseRules: [
      v => v.length <= 100 || `文字数は100文字以内です`
    ]
  }),
  mounted: function () {
    // 協力会社管理の画面情報をとってきます。
    this.getSubCompanyInfo()
  },
  computed: {
    /** v-tableのヘッダーを設定 */
    subCompanyHeader () {
      return [
        {
          text: '会社名',
          align: 'center',
          sortable: false,
          value: 'subCompanyName',
          width: '20%'
        },
        {
          text: '工種',
          value: 'workTypeName',
          align: 'center',
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
          value: 'employeeName',
          width: '20%'
        },
        {
          text: '所属会社',
          value: 'subCompanyName',
          align: 'center',
          width: '30%'
        },
        { text: '削除', value: 'delete', sortable: false, align: 'right', width: '50%' }
      ]
    },
  },
  methods: {
    
    //* * 共通 */ 

    // 初期表示処理です。
    async getSubCompanyInfo () {
      let response = await Methods.getSubCompanyInfo(this.contractorId)
      // レスポンスから画面情報をセットする
      this.subCompanyList = createSubCompanyList(response)
      this.subEmployeeList = createSubEmployeeList(response)
      this.workTypePullDown = createWorkTypePullDown(response)
      this.subCompanyPullDown = createSubCompanyPullDown(response)
    },
    // 日付のフォーマット処理です。
    displayDateFormat(date) {
      return dayjs(date).format("YYYY/MM/DD");
    },
    // 検索処理です。
    filterOnlyCapsText (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },

    //* * 協力会社一覧 */ 

    // 協力会社編集ダイアログ表示処理です。
    showEditSubCompany (item) {
      // 編集の場合
      if(item !== undefined){
        this.subCompanyEditItem = item
        this.subCompanyDialogName = '協力会社編集'
        this.subCompanyEditFlag = false;
        this.subCompanyEditBtnName = '編集';
        this.subCompanyCancelBtnName = '閉じる';
      // 追加の場合
      }else{
        // 入力項目に初期値を設定
        this.subCompanyEditItem = {
          subCompanyId : '',
          workTypeIdList: [{}],
        }
        this.subCompanyDialogName = '協力会社追加'
        // 新規の場合は、入力画面のみ表示
        this.subCompanyEditFlag = true;
        this.subCompanyEditBtnName = '保存';
        this.subCompanyCancelBtnName = '閉じる';
      }
      this.subCompanyDialog = true
    },
    // 工種プラスボタン押下時の処理です。
    onTouchWorkTypePlusBtn () {
      this.subCompanyEditItem.workTypeIdList.push({})
    },
    // 工種削除ボタン押下時の処理です。
    onTouchWorkTypeDeleteBtn () {
      this.subCompanyEditItem.workTypeIdList.pop()
    },
    // 協力会社編集ダイアログの編集・保存ボタン処理です。
    async onClickSubCompanyEditBtn () {
      if(this.subCompanyEditFlag){
        // 工種は工種IDだけ渡します。
        let selectworkTypeId = JSON.parse(JSON.stringify(this.subCompanyEditItem.workTypeIdList))
        let workTypeIdList = selectworkTypeId.map(item => item.workTypeId);
        const param = {
          contractorId: this.contractorId,
          userId: this.userId,
          subCompanyId: this.subCompanyEditItem.subCompanyId,
          subCompanyName: this.subCompanyEditItem.subCompanyName,
          foundation: this.subCompanyEditItem.foundation,
          leaderName: this.subCompanyEditItem.leaderName,
          postNumber1: this.subCompanyEditItem.postNumber1,
          postNumber2: this.subCompanyEditItem.postNumber2,
          address: this.subCompanyEditItem.address,
          telNumber1: this.subCompanyEditItem.telNumber1,
          telNumber2: this.subCompanyEditItem.telNumber2,
          telNumber3: this.subCompanyEditItem.telNumber3,
          workTypeIdList: workTypeIdList,
          note: this.subCompanyEditItem.note,
        }
        try {
          // 保存処理
          let response = await Methods.saveSubCompany(param)
          // レスポンスから画面情報をセットする
          this.subCompanyList = createSubCompanyList(response)
          this.subEmployeeList = createSubEmployeeList(response)
          this.workTypePullDown = createWorkTypePullDown(response)
          this.subCompanyPullDown = createSubCompanyPullDown(response)
          this.subCompanyEditFlag = false
          this.subCompanyDialog = false
          // 保存完了メッセージ表示
          this.$emit('alertMethod', response);
        }catch (err){
          let response = err.response;
          // エラーメッセージ表示
          this.$emit('alertMethod', response)
        }
      }else{
        this.subCompanyEditBtnName = '保存';
        this.subCompanyCancelBtnName = '戻る';
        this.subCompanyEditFlag = !this.subCompanyEditFlag
      }
    },
    // 協力会社編集ダイアログの閉じる・戻るボタン処理です。
    onClickSubCompanyCancelBtn () {
      // 新規の場合、戻るがないので閉じます。
      if(this.subCompanyEditItem.subCompanyId === ''){
        this.subCompanyEditFlag = false;
        this.subCompanyDialog = false;
      }else if(this.subCompanyEditFlag){
        this.subCompanyEditBtnName = '編集';
        this.subCompanyCancelBtnName = '閉じる';
        this.subCompanyEditFlag = !this.subCompanyEditFlag
      }else{
        this.subCompanyDialog = false;
      }
    },
    // 協力会社削除確認ダイアログ表示処理です。
    showDeleteSubCompanyConfirm (item) {
      this.deleteSubcompanyItem.subCompanyId = item.subCompanyId;
      this.subCompanyDeleteConfirmDialog = true;
    },
    // 削除ボタン押下処理(自社員)
    async onClickDeleteSubCompany () {
      const param = {
        contractorId: this.contractorId,
        userId: this.userId,
        subCompanyId: this.deleteSubcompanyItem.subCompanyId
      }
      try {
        // 削除処理
        let response = await Methods.deleteSubCompany(param)
        // レスポンスから画面情報をセットする
        this.subCompanyList = createSubCompanyList(response)
        this.subEmployeeList = createSubEmployeeList(response)
        this.workTypePullDown = createWorkTypePullDown(response)
        this.subCompanyPullDown = createSubCompanyPullDown(response)
        // 削除確認ダイアログを閉じる
        this.subCompanyDeleteConfirmDialog = false;
        // 削除完了メッセージ表示
        this.$emit('alertMethod', response);
      }catch (err){
        let response = err.response;
        // 削除完了メッセージ表示
        this.$emit('alertMethod', response);
      }
    },

    //* * 協力会社員一覧 */ 

    // 協力会社員編集ダイアログ表示処理です。
    showEditSubCompanyEmployee (item) {
      // 編集の場合
      if(item !== undefined){
        this.subEmployeeEditItem = item
        this.subEmployeeDialogName = '協力会社員編集'
        this.subEmployeeEditFlag = false;
        this.subEmployeeEditBtnName = '編集';
        this.subEmployeeCancelBtnName = '閉じる';
      // 追加の場合
      }else{
        // 入力項目に初期値を設定
        this.subEmployeeEditItem = {
          employeeId : '',
          license: [""],
        }
        this.subEmployeeDialogName = '協力会社員追加'
        // 新規の場合は、入力画面のみ表示
        this.subEmployeeEditFlag = true;
        this.subEmployeeEditBtnName = '保存';
        this.subEmployeeCancelBtnName = '閉じる';
      }
      this.subEmployeeDialog = true
    },
    // 協力会社員編集ダイアログの編集・保存ボタン処理です。
    async onClickSubEmployeeEditBtn () {
      var subCompanyId = "";
      // 工種は工種IDだけ渡します。
      if(this.subEmployeeEditItem.selectSubCompanyList != null){
        let selectSubCompanyId = JSON.parse(JSON.stringify(this.subEmployeeEditItem.selectSubCompanyList))
        subCompanyId = selectSubCompanyId.subCompanyId;
      }
      console.log(subCompanyId)
      if(this.subEmployeeEditFlag){
        const param = {
          contractorId: this.contractorId,
          userId: this.userId,
          companyId: subCompanyId,
          employeeId: this.subEmployeeEditItem.employeeId,
          employeeFirstname: this.subEmployeeEditItem.employeeFirstname,
          employeeLastname: this.subEmployeeEditItem.employeeLastname,
          loginId: this.subEmployeeEditItem.loginId,
          password: this.subEmployeeEditItem.password,
          birthday: this.subEmployeeEditItem.birthday,
          staffCode: this.subEmployeeEditItem.staffCode,
          address: this.subEmployeeEditItem.address,
          mailAddress: this.subEmployeeEditItem.mailAddress,
          telNumber1: this.subEmployeeEditItem.telNumber1,
          telNumber2: this.subEmployeeEditItem.telNumber2,
          telNumber3: this.subEmployeeEditItem.telNumber3,
          license: this.subEmployeeEditItem.license,
        }
        // 保存処理
        try {
          let response = await Methods.saveSubEmployee(param)
          // レスポンスから画面情報をセットする
          this.subCompanyList = createSubCompanyList(response)
          this.subEmployeeList = createSubEmployeeList(response)
          this.workTypePullDown = createWorkTypePullDown(response)
          this.subCompanyPullDown = createSubCompanyPullDown(response)
          this.subEmployeeEditFlag = false
          this.subEmployeeDialog = false
          // 保存完了メッセージ表示
          this.$emit('alertMethod', response);
        }catch (err){
          let response = err.response;
          // 削除完了メッセージ表示
          this.$emit('alertMethod', response);
        }
      }else{
        this.subEmployeeEditBtnName = '保存';
        this.subEmployeeCancelBtnName = '戻る';
        this.subEmployeeEditFlag = !this.subEmployeeEditFlag
      }
    },
    // 協力会社員編集ダイアログの閉じる・戻るボタン処理です。
    onClickSubEmployeeCancelBtn () {
      // 新規の場合、戻るがないので閉じます。
      if(this.subEmployeeEditItem.employeeId === ''){
        this.subEmployeeEditFlag = false;
        this.subEmployeeDialog = false;
      }else if(this.subEmployeeEditFlag){
        this.subEmployeeEditBtnName = '編集';
        this.subEmployeeCancelBtnName = '閉じる';
        this.subEmployeeEditFlag = !this.subEmployeeEditFlag
      }else{
        this.subEmployeeDialog = false;
      }
    },
    // 協力会社削除確認ダイアログ表示処理です。
    showDeleteSubEmployeeConfirm (item) {
      this.deleteSubEmployeeItem.employeeId = item.employeeId;
      this.subEmployeeDeleteConfirmDialog = true;
    },
    // 削除ボタン押下処理(自社員)
    async onClickDeleteSubEmployee () {
      const param = {
        contractorId: this.contractorId,
        userId: this.userId,
        employeeId: this.deleteSubEmployeeItem.employeeId
      }
      // 削除処理
      try {
        let response = await Methods.deleteSubEmployee(param)
        // レスポンスから画面情報をセットする
        this.subCompanyList = createSubCompanyList(response)
        this.subEmployeeList = createSubEmployeeList(response)
        this.workTypePullDown = createWorkTypePullDown(response)
        this.subCompanyPullDown = createSubCompanyPullDown(response)
        // 削除確認ダイアログを閉じる
        this.subEmployeeDeleteConfirmDialog = false;
        // 削除完了メッセージ表示
        this.$emit('alertMethod', response);
      }catch (err){
        let response = err.response;
        // 削除完了メッセージ表示
        this.$emit('alertMethod', response);
      }
    },
    // 保有資格プラスボタン押下時の処理です。
    onTouchLicensePlusBtn () {
      this.subEmployeeEditItem.license.push("")
    },
    // 保有資格削除ボタン押下時の処理です。
    onTouchLicenseDeleteBtn () {
      this.subEmployeeEditItem.license.pop()
    },
    // TODO 社員一覧ダウンロード処理
    download (format) {
      console.log(format)
    },
  }
}
//
// privateメソッドです。
//
/**
 * レスポンスをもとに画面情報(協力会社)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createSubCompanyList (response) {
  var subCompanyResponse = response.data.subCompanyResponse
  var workTypeResponse = response.data.workTypeResponse
  // 協力会社一覧表示用に変換します。
  var subCompanyList = []
  for (var i = 0; i < subCompanyResponse.length; i++) {
    var subCompany = {}
    subCompany.subCompanyId = subCompanyResponse[i].subCompanyId
    subCompany.subCompanyName = subCompanyResponse[i].subCompanyName
    subCompany.foundation = subCompanyResponse[i].foundation
    subCompany.leaderName = subCompanyResponse[i].leaderName
    subCompany.postNumber1 = subCompanyResponse[i].postNumber1
    subCompany.postNumber2 = subCompanyResponse[i].postNumber2
    subCompany.address = subCompanyResponse[i].address
    subCompany.telNumber1 = subCompanyResponse[i].telNumber1
    subCompany.telNumber2 = subCompanyResponse[i].telNumber2
    subCompany.telNumber3 = subCompanyResponse[i].telNumber3
    // 選択中の工種を選択
    var workTypeIdList = [];
    var workTypeName = "";
    for (var j = 0; j < subCompanyResponse[i].workTypeIdList.length; j++) {
        var selectWorkType = {};
        var selectWorkTypeId = subCompanyResponse[i].workTypeIdList[j];
        selectWorkType.workTypeName = getWorkTypeName(selectWorkTypeId, workTypeResponse);
        selectWorkType.workTypeId = subCompanyResponse[i].workTypeIdList[j];
        workTypeIdList.push(selectWorkType);
        workTypeName = workTypeName === "" ? selectWorkType.workTypeName :  workTypeName + "、" + selectWorkType.workTypeName
    }
    subCompany.workTypeIdList = workTypeIdList
    subCompany.workTypeName = workTypeName
    subCompany.note = subCompanyResponse[i].note
    subCompanyList.push(subCompany)
  }
  return subCompanyList
}
/**
 * レスポンスをもとに画面情報(協力会社員)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createSubEmployeeList (response) {
  var subCompanyResponse = response.data.subCompanyResponse
  var subEmployeeResponse = response.data.subEmployeeResponse
  // 協力会社員一覧表示用に変換します。
  var subEmployeeList = []
  for (var i = 0; i < subEmployeeResponse.length; i++) {
    var subEmployee = {}
    subEmployee.employeeId = subEmployeeResponse[i].employeeId
    subEmployee.loginId = subEmployeeResponse[i].loginId
    subEmployee.password = subEmployeeResponse[i].password
    subEmployee.companyId = subEmployeeResponse[i].companyId
    subEmployee.subCompanyName = getCompanyName(subEmployeeResponse[i].companyId, subCompanyResponse);
    // 選択中の協力会社を設定
    subEmployee.selectSubCompanyList = {
      subCompanyId: subEmployeeResponse[i].companyId,
      subCompanyName: getCompanyName(subEmployeeResponse[i].companyId, subCompanyResponse)
    }
    subEmployee.employeeName = subEmployeeResponse[i].employeeFirstname + subEmployeeResponse[i].employeeLastname
    subEmployee.employeeFirstname = subEmployeeResponse[i].employeeFirstname
    subEmployee.employeeLastname = subEmployeeResponse[i].employeeLastname
    subEmployee.birthday = subEmployeeResponse[i].birthday
    subEmployee.staffCode = subEmployeeResponse[i].staffCode
    subEmployee.address = subEmployeeResponse[i].address
    subEmployee.mailAddress = subEmployeeResponse[i].mailAddress
    subEmployee.telNumber1 = subEmployeeResponse[i].telNumber1
    subEmployee.telNumber2 = subEmployeeResponse[i].telNumber2
    subEmployee.telNumber3 = subEmployeeResponse[i].telNumber3
    subEmployee.license = subEmployeeResponse[i].license
    subEmployeeList.push(subEmployee)
  }
  return subEmployeeList
}
/**
 * レスポンスをもとに画面情報(工種セレクトボックス)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createWorkTypePullDown (response) {
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
/**
 * レスポンスをもとに画面情報(協力会社セレクトボックス)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createSubCompanyPullDown (response) {
  var subCompanyResponse = response.data.subCompanyResponse
  var subCompanyPullDown = []
  for (var k = 0; k < subCompanyResponse.length; k++) {
    var company = {}
    company.subCompanyId = subCompanyResponse[k].subCompanyId
    company.subCompanyName = subCompanyResponse[k].subCompanyName
    subCompanyPullDown.push(company)
  }
  return subCompanyPullDown
}
/**
 * 工種IDをもとに工種名を取得します。
 * 
 * @param {string} workTypeId 工種IDです。
 * @param {object} workTypeResponse 工種のレスポンスデータです。
 * 
 * @private
 * @returns
 */
function getWorkTypeName(workTypeId, workTypeResponse) {
  var worlTypeName = "";
  for (var i = 0; i < workTypeResponse.length;i++) {
    if (workTypeId === workTypeResponse[i].workTypeId) {
      worlTypeName = workTypeResponse[i].workTypeName;
    }
  }
  return worlTypeName;
}
/**
 * 会社IDをもとに会社名を取得します。
 * 
 * @param {string} subCompanyId 会社IDです。
 * @param {object} subCompanyResponse 協力会社のレスポンスデータです。
 * 
 * @private
 * @returns
 */
function getCompanyName(subCompanyId, subCompanyResponse) {
  var subCompanyName = "";
  for (var i = 0; i < subCompanyResponse.length;i++) {
    if (subCompanyId === subCompanyResponse[i].subCompanyId) {
      subCompanyName = subCompanyResponse[i].subCompanyName;
    }
  }
  return subCompanyName;
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
.to-edit-label {
  line-height: 60px;
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
