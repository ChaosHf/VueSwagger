<template>
    <div class="m-tabs" id="tabs">
        <h1>{{json.info.title}}</h1>
        <div class="u-url">Base Url: {{json.host}}</div>
        <div class="u-version">version : {{json.info.version}}</div>
        <div class="m-schemes">
            <span>Schemes</span>
            <select>
                <option v-for="op in json.schemes">{{op}}</option>
            </select>
        </div>
        <div class="m-index">
            <div v-for="(val,key,index) in json.paths" class="u-index">
                <span @click="goAnchor('#anchor-'+index)">{{key}}</span>
            </div>
        </div>
        <div class="m-toolbar">
            <div v-for="(val,key,index) in json.paths" class="m-panel">
                <span :id="'anchor-'+index">{{key}}</span>
                <div class="m-info" v-for="(v,k,i) in val">
                    <div class="m-info-title">
                        <span class="u-type">{{k}}</span>
                        <span class="u-method">{{key}}</span>
                    </div>
                    <div class="m-info-content">
                        <div class="m-info-tips" v-if="v.summary">
                            <h3>summary</h3>
                            <div class="u-info-tips">{{v.summary}}</div>
                        </div>
                        <div class="m-info-param">
                            <div class="m-input-param" v-for="pa in v.parameters" v-if="pa.schema">
                                <h2>Parameters</h2>
                                <ul class="m-params-title">
                                    <li>Parameters</li>
                                    <li class="u-input">Value</li>
                                    <li>format</li>
                                    <li>type</li>
                                </ul>
                                <div class="m-params-input" v-for="(defV,defK,defI) in json.definitions" v-if="defK === lastMethod(pa.schema.$ref)" :ref="defI">
                                    <ul class="u-params-input" v-for="(defpV,defpK,defpI) in defV.properties" >
                                        <li>{{defpK}}</li>
                                        <li class="u-input">
                                            <input type="text" />
                                        </li>
                                        <li>{{defpV.format}}</li>
                                        <li>{{defpV.type}}</li>
                                    </ul>
                                    <div class="u-button-go" @click="getUpload(defI)">Fire in the hole！</div>
                                </div>
                            </div>
                            <div class="m-info-param m-info-res">
                                <h2>Response Messages</h2>
                                <ul class="m-params-title">
                                    <li>HTTP Status Code</li>
                                    <li>Description</li>
                                    <li>Response Model</li>
                                    <li>Headers</li>
                                </ul>
                                <ul class="u-params-input" v-for="(resV,resK) in v.responses">
                                    <li>{{resK}}</li>
                                    <li>{{resV.description}}</li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            json: null,
            params: []
        }
    },
    mounted: function () {
        this.getData();
    },
    filters: {
        cutTheSame(arr) {
            var arr2 = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr2.indexOf(arr[i]) < 0) {
                    arr2.push(arr[i]);
                }
            }

            return arr2;
        },
        lastMethod(str) {
            var index = str.lastIndexOf("\/");
            str = str.substring(index + 1, str.length);
            return str;
        }
    },
    methods: {
        getData() {
            var that = this;
            that.$api.get('../../static/swagger.json', null, function (res) {
                that.json = res;
                var addVal = that.json.definitions;
                for (var a in addVal) {
                    for (var b in addVal[a].properties) {
                        addVal[a].properties[b]['inputVal'] = '';
                        that.inputValue = addVal[a].properties[b].inputVal;
                    }
                }
            })
        },
        lastMethod(str) {
            var index = str.lastIndexOf("\/");
            str = str.substring(index + 1, str.length);
            return str;
        },
        goAnchor(selector) {
            var anchor = this.$el.querySelector(selector);
            document.body.scrollTop = anchor.offsetTop;
        },
        getUpload(refNum) {
            console.log(this.$refs);
            console.log(this.$refs[refNum]);
        }
    }
}
</script>
