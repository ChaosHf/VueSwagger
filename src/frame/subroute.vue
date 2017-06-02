<template>
    <div class="m-tabs" id="tabs">
        <h1>Xzz.WebApi</h1>
        <ul class="m-toolbar">
            <li v-for="item in tabsTitle">
                {{item.title}}
            </li>
    
        </ul>
        <div>{{jsonfor(json)}}</div>
        <subData :data='json'></subData>
    </div>
</template>
<script>
export default {
    data() {
        return {
            json: {
                "swagger": "2.0",
                "info": {
                    "version": "v1",
                    "title": "Xzz.WebApi"
                },
                "host": "api.xzz-test.com",
                "schemes": [
                    "http"
                ],
                "paths": {
                    "/api/ApiBase/GetParams": {
                        "get": {
                            "tags": [
                                "ApiBase"
                            ],
                            "summary": "取所有的参数",
                            "operationId": "ApiBase_GetParams",
                            "consumes": [],
                            "produces": [
                                "application/json",
                                "text/json",
                                "application/xml",
                                "text/xml",
                                "text/javascript",
                                "application/javascript",
                                "application/json-p"
                            ],
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "schema": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "/api/ApiBase/GetFormParam": {
                        "get": {
                            "tags": [
                                "ApiBase"
                            ],
                            "summary": "从form 中取参数",
                            "operationId": "ApiBase_GetFormParam",
                            "consumes": [],
                            "produces": [
                                "application/json",
                                "text/json",
                                "application/xml",
                                "text/xml",
                                "text/javascript",
                                "application/javascript",
                                "application/json-p"
                            ],
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "schema": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            },
            tabsTitle: [
                {
                    title: 'ApiBase',
                    view: 'ApibBaseView'
                },
                {
                    title: 'Common',
                    view: 'CommonView'
                },
                {
                    title: 'Content',
                    view: 'ContentView'
                },
            ]
        }
    },
    components: {
        subData: {
            name: 'subData',
            template: [
                '<ul>',
                '<li v-for="(val,key) in data">',
                '<div v-if="is_obj(val)">',
                '<span>{{ key }}</span>',
                '<subData :data="val"></subData>',
                '</div>',
                '<span v-if="!is_obj(val)">{{key}} - {{val}}</span>',
                '</li>',
                '</ul>'].join(''),
            props: { data: {} },
            methods: {
                is_obj: function (val) {
                    if (Object.prototype.toString.call(val) === "[object Object]") {
                        return val;
                    }
                }
            }
        }
    },
    methods: {
        jsonfor: function (m) {
            for (var k in m) {
                if (Object.prototype.toString.call(m[k]) === "[object Object]") {
                    console.log(k);
                    this.jsonfor(m[k]);
                } else {
                    console.log(k + ':' + m[k]);
                }
            }
        }
    }
}
</script>
