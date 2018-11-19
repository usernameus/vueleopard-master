
<template>
    <Modal
        :title="dialogTitle"
        v-model="dialogFormVisible"
        @on-cancel= "handleDelete('formDynamic')"      
        class-name="vertical-center-modal">      
       <Form ref="formDynamic" :model="formDynamic" :rules="ruleValidate" :label-width="80">
            <FormItem label="应用名称" prop="appname">
                <Input v-model="formDynamic.appname"></Input>
            </FormItem>
           <!--  <FormItem label="是否核心应用" prop="swith">
                <i-switch v-model="formItem.switch" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>  -->
            <FormItem label="IP" prop="appip">
                <Input v-model="formDynamic.appip"></Input>
            </FormItem>
            <FormItem label="域名" prop="domain">
                <Input v-model="formDynamic.domain"></Input>
            </FormItem>
            <FormItem label="端口" prop="appport">
                <Input v-model="formDynamic.appport"></Input>
            </FormItem>
            <FormItem label="视图" prop="webview">
                <Input v-model="formDynamic.webview"></Input>
            </FormItem>
            <FormItem label="应用说明" prop="appdesc">
                <Input v-model="formDynamic.appdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button size="large" type="default" @click="handleDelete('formDynamic')">取消</Button>
            <Button size="large" type="primary" @click="handleSubmit('formDynamic')">确定</Button>
        </div>
    </Modal>
</template>
<script>
    import {addApplication} from '../../api/api';
    export default {
       name: "ToModal",
       props: {
          dialogFormVisible: Boolean,
          dialogTitle: String,
          editListData: Object
        },
        data () {
             return {
                formDynamic: {
                    appname: '',
                    appip:'',
                    domain:'',
                    appport: '',
                    webview: '',
                    appdesc:''
                },
                ruleValidate: {
                   appname: [
                    { required: true, message: '请输入应用名称', trigger: 'blur' }
                   ]
                }
            }
        },
        watch:{
           editListData:function(newValue,oldValue){
             /* this.$refs[name].resetFields();*/
              this.formDynamic = newValue;
           }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {               
                    if (valid) {
                      var datas = {
                        appname: this.formDynamic.appname,
                        appip: this.formDynamic.appip,
                        domain: this.formDynamic.domain,
                        appport: this.formDynamic.appport,
                        webview: this.formDynamic.webview,
                        appdesc: this.formDynamic.appdesc
                      };
                      addApplication(datas).then(data => {
                        let { msg, code } = data;
                        if (code == "200") {
                          this.$Message.success(msg);                         
                        } else {
                           this.$Message.error(msg);
                        }
                      });
                       this.$emit('cancel');
                    } else {
                        this.$Message.error('验证不通过!');
                        return false;
                    }                   
                })
            },
            handleDelete (name) {
                this.$emit('cancel');
            }
        }
    }
</script>

