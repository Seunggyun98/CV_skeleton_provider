<template>
  <form action="{% 'ac' %}" method="post">
	<div style="margin: 1px">
    <div>
      <v-card>
        <v-card-text>
          <h2 style="text-align:center; color:#000000">Options</h2>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                class="ma-2"
                v-model="options.gray"
                :label="`회색조`"
                ></v-checkbox>
              <v-checkbox
                v-model="options.back"
                :label="`배경 제거`"
                ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                class="ma-2"
                v-model="options.autolocation"
                :label="`배경 제거 틀 자동 조정`"
                ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                class="ma-2"
                v-model="options.gamma"
                :label="`감마 조절`"
                >
              </v-text-field>
              <v-checkbox
                v-model="options.b_propo"
                :label="`자동 대비`"
                ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>  
    </div>
    <div>
      <h2 style="margin : 20px; text-align:center">ImageContainter</h2>
      <v-divider></v-divider>
      <v-row style="margin: 1px">
        <v-file-input
          class="input"
          type="file" 
          v-model="file"
          chips
          show-size
          truncate-length="20"
          accept="image/*"
          @change="onChangeFile"
          label="이미지 파일 불러오기">
        </v-file-input>
      </v-row>
      <v-row style="margin: 1px">
          <v-btn style="margin: 2px" depressed color="black" block @click="getSkeleton">
              변환
          </v-btn>
      </v-row>
      <v-row style="margin: 1px">
        <v-col>
          <v-card max-height="600px" style="object-fit: contain;">
            <h3 style="margin: 2px">Before</h3>
            <v-divider></v-divider>
            <v-img
              :src="fileUrl" contain height="500px"  style="border: 1px dashed #ccc;">
            </v-img>
          </v-card>
        </v-col>
        <v-divider vertical>
        </v-divider>
        <v-col>
          <v-card max-height="600px">
          <h3 style="margin: 2px">After</h3>
          <v-divider></v-divider>
          <v-img contain height="500px">

          </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
	</div>
  </form>
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL='http://127.0.0.1:3000'
axios.defaults.xsrfCookieName='csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
//axios.defaults.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');
// var URL="{% url 'projects:Unread' %}"
  export default {
    components:{
    },
    data(){
      return{
        options:{
          gray: false,
          gamma: 1.0,
          back: false,
          b_propo: true,
          autolocation: false,
        },
        file: undefined,
        fileUrl:"",
      }
    },
    methods:{
      
      onChange(){
      },
      upload(file){
        console.log('upload file!')
        console.log(this.file.name);
        const reader = new FileReader();
        reader.onload = e=>{ 
          this.fileUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      onChangeFile(file){
        if(!file){
          return;
        }
        this.upload(file);
      },
      getSkeleton(){
        // 백엔드로 넘겨주기
        const frm = new FormData(); 
        console.log(this.fileUrl);
        frm.append('file', JSON.stringify(this.fileUrl)); 
        frm.append('options', JSON.stringify(this.options));
        axios.post("ac/",frm).then((response) => {
            console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        });
      },
    },
    
  }
</script>