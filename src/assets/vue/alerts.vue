<template>
    <div class="page-content">
        <f7-timeline class="virtual-list">
            <!--<div v-for="msg in messages" class="timeline-item">-->
            <!--<div class="timeline-item-date">{{ msg.day }}-->
            <!--<small>{{ msg.month }}</small>-->
            <!--</div>-->
            <!--<div class="timeline-item-divider"></div>-->
            <!--<div class="timeline-item-content">-->
            <!--<div class="timeline-item-inner">-->
            <!--<div class="timeline-item-time">-->
            <!--<span class="time">{{ msg.time }}</span>-->
            <!--<i v-if="msg.type === 'alert'" class="material-icons msg-mark alert">warning</i>-->
            <!--<i v-else-if="msg.type === 'warn'" class="material-icons msg-mark warn">error</i>-->
            <!--<i v-else-if="msg.type === 'info'" class="material-icons msg-mark info">info</i>-->
            <!--</div>-->
            <!--<div class="timeline-item-title">{{ msg.name }}</div>-->
            <!--<div class="timeline-item-subtitle">{{ msg.location }}</div>-->
            <!--<div class="timeline-item-text">{{ msg.type }}</div>-->

            <!--<f7-button :href="'/message/'+msg.id"-->
            <!--:color="msgTypeToColor(msg.type)">-->
            <!--View-->
            <!--</f7-button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
        </f7-timeline>

        <!--<f7-navbar back-link="Back" title="Virtual List" sliding>-->
        <!--<f7-nav-right>-->
        <!--&lt;!&ndash; Add new VL item on click &ndash;&gt;-->
        <!--<f7-link @click="addNewItem">New Item</f7-link>-->
        <!--</f7-nav-right>-->
        <!--</f7-navbar>-->
        <!--&lt;!&ndash;-->
        <!--Searchbar to search thorugh VL Items-->
        <!--List to search specified in "search-list" prop-->
        <!--&ndash;&gt;-->
        <!--<f7-navbar>-->
        <!--<f7-searchbar cancel-link="Cancel" search-list="#search-list"></f7-searchbar>-->
        <!--</f7-navbar>-->
        <!--&lt;!&ndash; This block will become visible when there is nothing found &ndash;&gt;-->
        <!--<f7-list class="searchbar-not-found">-->
        <!--<f7-list-item title="Nothing found"></f7-list-item>-->
        <!--</f7-list>-->

        <!--&lt;!&ndash; Search through this list &ndash;&gt;-->
        <!--<f7-list-->
        <!--id="search-list"-->
        <!--class="searchbar-found"-->
        <!--media-list-->
        <!--virtual-->
        <!--:virtual-items="items"-->
        <!--:virtual-height="63"-->
        <!--:virtual-search-all="searchAll">-->
        <!--&lt;!&ndash; Template 7 Virtual List Item Template &ndash;&gt;-->
        <!--<t7-template>-->
        <!--<f7-list-item media-item link="#" :title="'{{title}}'" :subtitle="'{{subtitle}}' ">-->
        <!--{{@global}}-->
        <!--&lt;!&ndash; This title is not defined ... &ndash;&gt;-->
        <!--</f7-list-item>-->
        <!--</t7-template>-->
        <!--</f7-list>-->

        <!--<div class="virtual-list">-->

        <!--</div>-->

    </div>
</template>

<script>
    export default {
        data() {
            return {
                messages: this.msgGen(100),
                messages_old: [
                    {
                        id: 1,
                        name: 'Cristea Alex',
                        location: 'Targusor C1',
                        type: 'alert',
                        time: '12:31',
                        day: '12',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 2,
                        name: 'Vasiliu Alexandru',
                        location: 'Targusor C1',
                        type: 'warn',
                        time: '12:03',
                        day: '12',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 3,
                        name: 'Lucian Dan',
                        location: 'Str. Pepenilor',
                        type: 'info',
                        time: '13:45',
                        day: '11',
                        month: '05',
                        year: '2017'
                    },
                    {
                        id: 4,
                        name: 'Dan Cehan',
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
        computed: {
            sortedMsgs() {
                return this.messages.sort(function (obj1, obj2) {
                    let d1 = new Date(obj1.year, obj1.month, obj1.day, obj1.time.split(":")[0], obj1.time.split(":")[1]);
                    let d2 = new Date(obj2.year, obj2.month, obj2.day, obj2.time.split(":")[0], obj2.time.split(":")[1]);
                    return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
                });
            }
        },
        props: {},
        methods: {
            onF7Init() {
                this.$f7.virtualList('.virtual-list', {
                    items: this.sortedMsgs,
                    template: '<div class="timeline-item">' +
                    '<div class="timeline-item-date">' +
                    '{{day}} <small>{{month}}</small>' +
                    '</div>' +
                    '                <div class="timeline-item-divider"></div>' +
                    '                    <div class="timeline-item-content">' +
                    '                    <div class="timeline-item-inner">' +
                    '                    <div class="timeline-item-time">' +
                    '                    <span class="time">{{time}}</span>' +
                    '                {{#js_compare "this.type === \'alert\'"}}<i class="material-icons msg-mark alert">warning</i>{{/js_compare}}' +
                    '                {{#js_compare "this.type === \'warn\'"}}<i class="material-icons msg-mark warn">error</i>{{/js_compare}}' +
                    '                {{#js_compare "this.type === \'info\'"}}<i class="material-icons msg-mark info">info</i>{{/js_compare}}' +
                    '                    </div>' +
                    '                    <div class="timeline-item-title">{{name}}</div>' +
                    '                <div class="timeline-item-subtitle">{{location}}</div>' +
                    '                <div class="timeline-item-text">{{type}}</div>' +
                    '{{#js_compare "this.type === \'alert\'"}}' +
                    '<a href="/message/{{id}}" class="button color-red">View</a>' +
                    '{{/js_compare}}' +
                    '{{#js_compare "this.type === \'warn\'"}}' +
                    '<a href="/message/{{id}}" class="button color-ember">View</a>' +
                    '{{/js_compare}}' +
                    '{{#js_compare "this.type === \'info\'"}}' +
                    '<a href="/message/{{id}}" class="button color-white">View</a>' +
                    '{{/js_compare}}' +
                    '                    </div>' +
                    '                    </div>' +
                    '                    </div>'
                });
            },
            msgTypeToColor(type) {
                if (type === 'alert')
                    return 'red';
                else if (type === 'warn')
                    return 'amber';
                else if (type === 'info')
                    return 'white';
            },
            randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            },
            msgGen(max) {
                let msgs = [];
                let types = ['alert', 'warn', 'info'];
                for (let i = 0; i < max; ++i) {
                    let H = String(this.randomIntFromInterval(0, 23));
                    let m = String(this.randomIntFromInterval(0, 59));
                    let day = String(this.randomIntFromInterval(1, 15));
                    H = H.length < 2 ? '0' + H : H;
                    m = m.length < 2 ? '0' + m : m;
                    day = day.length < 2 ? '0' + day : day;

                    msgs.push({
                        id: i,
                        name: 'Username ' + i,
                        location: 'Location ' + i,
                        type: types[Math.floor(Math.random() * types.length)],
                        time: H + ':' + m,
                        day: day,
                        month: '05',
                        year: '2017'
                    })
                }
                return msgs;
            }
        }
    }
    //    let myItems = [];
    //    export default {
    //        data: function () {
    //            let items = myItems;
    //            for (let i = 1; i <= 10000; i++) {
    //                items.push({
    //                    title: 'Item ' + i,
    //                    subtitle: 'Subtitle ' + i,
    //                    ind: String(i)
    //                })
    //            }
    //            return {
    //                items: items
    //            }
    //        },
    //        methods: {
    //            // Method to add new item
    //            addNewItem: function () {
    //
    //                let self = this;
    //                self.items.push({
    //                    title: 'Item ' + (self.items.length + 1),
    //                    subtitle: 'Subtitle ' + (self.items.length + 1),
    //                    ind: Math.floor(Math.random() * 20)
    //                });
    //
    ////                console.log(myItems[myItems.length - 1]);
    //                console.log(this.$f7);
    //            },
    //            // Function to proceed search results
    //            searchAll: function (query) {
    //                let self = this;
    //                let found = [];
    //                for (let i = 0; i < self.items.length; i++) {
    //                    if (self.items[i].title.indexOf(query) >= 0
    //                        || query.trim() === '') found.push(i);
    //                }
    //                return found;
    //            }
    //        }
    //    }


    //    export default {
    //        data() {
    //            return {
    //                items: [
    //                    {
    //                        title: 'Item 1'
    //
    //                    },
    //                    {
    //                        title: 'Item 2'
    //
    //                    },
    //                    {
    //                        title: 'Item 1000'
    //                    },
    //                ]
    //            }
    //        },
    //        methods: {
    //            onF7Init() {
    //                console.log("on f7 INIIIIIIIIIIIIIIIIIIIT");
    //                console.log(this.$f7);
    //                this.$f7.virtualList('.virtual-list', {
    //                    items: this.items,
    //                    template: '<p>{{title}}</p>'
    //                });
    //            }
    //            // onF7Init
    //        }
    //    }
</script>

<style>
    .msg-mark.alert {
        float: right;
        color: rgba(244, 67, 54, 0.7);
    }

    .msg-mark.warn {
        float: right;
        color: rgba(255, 193, 7, 0.7);
    }

    .msg-mark.info {
        float: right;
        color: rgba(255, 255, 255, 0.7);
    }

    .time {
        vertical-align: super;
    }

    .timeline, .timeline > ul {
        padding: 0;
    }

    .timeline .timeline-item-content {
        width: calc(70% - 20px);
    }
</style>
