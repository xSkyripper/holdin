<template>
    <f7-login-screen class="layout-dark">
        <f7-view>
            <f7-pages>
                <f7-page login-screen>
                    <f7-login-screen-title>H.O.L.D.I.N Info</f7-login-screen-title>

                    <f7-list form>
                        <f7-list-item>
                            <f7-icon slot="media"><i class="material-icons">account_circle</i></f7-icon>
                            <f7-label>Username</f7-label>
                            <f7-input name="username" type="text" placeholder="Username"></f7-input>
                        </f7-list-item>

                        <li>

                            <a href="#" class="item-link smart-select"
                               data-searchbar="true" data-searchbar-placeholder="Search zones">
                                <select name="zones">
                                    <option value="zone1" selected>zone 1 (nearest = city X)</option>
                                    <option value="zone2">zone 2</option>
                                    <option value="zone3">zone 3</option>
                                    <option value="zone4">zone 4</option>
                                    <option value="zone5">zone 5</option>
                                </select>
                                <div class="item-content">
                                    <div class="item-media">
                                        <i class="icon"><i class="material-icons">location_city</i></i>
                                    </div>
                                    <div class="item-inner">
                                        <div class="item-title label">Location area</div>
                                        <div class="item-after"></div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <!-- smart-select w/ searchbar -->
                    </f7-list>

                    <f7-buttons>
                        <f7-button @click="onStart" color="blue" title="Start" fill>Start</f7-button>
                    </f7-buttons>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-login-screen>
    <!-- login-screen -->

</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            onStart() {
                console.log('login:onStart');
                this.$f7.closeModal();
            }
        }
    }
</script>

<style>
    .smart-select .item-after {
        padding: 0;
        margin-left: 0;
    }
</style>
