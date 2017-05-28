<template>
    <div class="page-content">
        <f7-block-title>
            <h2>Profile</h2>
        </f7-block-title>

        <f7-list>
            <f7-list-group>
                <f7-list-item title="System status" group-title></f7-list-item>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">wifi</i></div>
                        <div class="item-title">Network</div>
                        <div class="item-after">
                            <span v-if="sharedState.statusNetwork" class="color-green">
                                {{sharedState.statusNetwork}} - Online
                            </span>
                            <span class="color-red" v-else>
                                Offline
                            </span>
                        </div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">archive</i></div>
                        <div class="item-title">IPFS Repo</div>
                        <div class="item-after">
                            <span v-if="sharedState.statusIpfsRepo" class="color-green">
                                Online
                            </span>
                            <span class="color-red" v-else>
                                Offline
                            </span>
                        </div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">code</i></div>
                        <div class="item-title">IPFS Daemon</div>
                        <div class="item-after">
                            <span v-if="sharedState.statusIpfsDaemon" class="color-green">
                                Online
                            </span>
                            <span class="color-red" v-else>
                                Offline
                            </span>
                        </div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">comment</i></div>
                        <div class="item-title">IPFS PubSub</div>
                        <div class="item-after">
                            <span v-if="sharedState.statusIpfsPubSub" class="color-green">
                                Online
                            </span>
                            <span class="color-red" v-else>
                                Offline
                            </span>
                        </div>
                    </div>
                </li>
            </f7-list-group>
            <f7-list-group>
                <f7-list-item title="User status" group-title></f7-list-item>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">account_box</i></div>
                        <div class="item-title">Username</div>
                        <div class="item-after">{{sharedState.username}}</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_city</i></div>
                        <div class="item-title">Location area</div>
                        <div class="item-after">{{sharedState.locationArea}}</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-media"><i class="material-icons">location_on</i></div>
                        <div class="item-title">Location coordinates</div>
                        <div class="item-after">{{sharedState.locationExact}}</div>
                    </div>
                </li>
            </f7-list-group>

            <f7-list-group>
                <f7-list-item title="My Alerts" group-title></f7-list-item>
                <a v-for="myMsg in myMessages" :href="'/message/'+myMsg.id" class="item-link">
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-media">
                                <i v-if="myMsg.type === 'alert'" class="material-icons">warning</i>
                                <i v-else-if="myMsg.type === 'warn'" class="material-icons">error</i>
                                <i v-else="myMsy.type === 'info'" class="material-icons">info</i>
                            </div>
                            <div class="item-title">{{myMsg.location}}</div>
                            <div class="item-after">{{myMsg.time}} {{myMsg.day}}.{{myMsg.month}}.{{myMsg.year}}</div>
                        </div>
                    </div>
                </a>
            </f7-list-group>
        </f7-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sharedState: this.$myStore.state,
                privateState: {},
                myMessages: [
                    {
                        id: 1,
                        name: 'Alex',
                        location: 'Targusor C1',
                        type: 'alert',
                        time: '12:31',
                        day: '12',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 2,
                        name: 'Alex',
                        location: 'Targusor C1',
                        type: 'warn',
                        time: '12:03',
                        day: '12',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 3,
                        name: 'Alex',
                        location: 'Str. Pepenilor',
                        type: 'info',
                        time: '13:45',
                        day: '11',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 4,
                        name: 'Alex',
                        location: 'Str. Pepenilor nr 14',
                        type: 'alert',
                        time: '22:37',
                        day: '15',
                        month: '05',
                        year: '2017'
                    }
                ]
            }
        },
        props: {},
        methods: {}
    }
</script>

<style>

</style>
