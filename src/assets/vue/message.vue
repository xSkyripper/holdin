<template>
    <f7-page>
        <f7-navbar :title="'Message '+$route.params.id"
                   back-link="Back"
                   sliding>
        </f7-navbar>

        <f7-block class="message-block">
            <f7-block-title class="message-title">
                <!--TODO: v-if type-->
                <i class="material-icons message-mark color-red">warning</i>
            </f7-block-title>

            <f7-list>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">account_circle</i></div>
                        <div class="item-title">Username</div>
                        <div class="item-after">name</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_city</i></div>
                        <div class="item-title">Location zone</div>
                        <div class="item-after">zone</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_on</i></div>
                        <div class="item-title">Location exact - Longitude</div>
                        <div class="item-after">lon</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_on</i></div>
                        <div class="item-title">Location exact - Latitude</div>
                        <div class="item-after">lat</div>
                    </div>
                </li>

                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media">
                            <i class="material-icons">details</i>
                        </div>
                        <div class="item-title"></div>
                        <div class="item-after"></div>
                        <div class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cupiditate libero molestias veritatis. Adipisci aperiam distinctio, eaque ipsa, itaque iusto laboriosam, laudantium modi nisi nostrum officia omnis repellendus sed sunt?
                        </div>
                    </div>
                </li>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        methods: {
            showLog(){
                console.log(this.$route);
            }
        }
    }
</script>

<style>
    .message-block {
        margin-top:56px;
    }

    .message-title {
        text-align: center;
    }

    .message-title .message-mark {
        font-size: 48px;
    }
</style>
