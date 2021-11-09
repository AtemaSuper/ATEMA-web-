<template>
  <v-app id="inspire">
    <v-row class="justify-start">
      <v-col cols="1">基本情報</v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="item-label">会社名</v-col>
      <v-col cols="3">
        <v-text-field
          outlined
          :rules="[rules.required, rules.emailMatch]"
          name="input-10-2"
          label="Error"
          hint="At least 8 characters"
          value="Pa"
          error
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="item-label">設立</v-col>
      <v-col cols="1">
        <v-text-field outlined label="年"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field outlined label="月"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field outlined label="日"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="item-label">代表者</v-col>
      <v-col cols="3">
        <v-text-field outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="item-label">郵便番号</v-col>
      <v-col cols="1">
        <v-text-field outlined></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="item-label">住所</v-col>
      <v-col cols="3">
        <v-text-field outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="item-label">電話番号</v-col>
      <v-col cols="1">
        <v-text-field outlined></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field outlined></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="item-label">工種</v-col>
      <v-col cols="3">
        <v-select :items="items" label="Solo field" solo></v-select>
        <v-btn class="mx-2" fab dark color="indigo">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      rules: {
        required: value => !!value || '入力必須です。',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`)
      }
    }
  },
  components: {
  },
  conputed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.item-label {
  text-align: left;
}
</style>
