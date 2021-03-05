import Vue from "vue";
import { 
    Button, 
    Tabbar,
    TabbarItem,
    Icon,
    Image,
    Loading,
    Lazyload,
    Empty,
    PullRefresh,
    List,
    Stepper,
    NavBar,
    SubmitBar,
    Checkbox,
    CheckboxGroup,
    Toast,
    Dialog,
    Search,
    Cell,
} from "vant";

Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;

Vue.use(Button)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Icon)
    .use(Image)
    .use(Loading)
    .use(Lazyload)
    .use(Empty)
    .use(PullRefresh)
    .use(List)
    .use(Stepper)
    .use(NavBar)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Search)
    .use(Cell);
