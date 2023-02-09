import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminView from '../views/admin/AdminView.vue'
import Login from '../views/Login.vue'
import UserManageView from '../views/admin/UserManageView'
import VehicleManageView from '../views/admin/VehicleManageView'
import UserView from '../views/user/UserView'
import TravelReiView from '../views/user/TravelReiView'
import AddTravelReiView from '../views/user/AddTravelReiView'
import TicketInfoView from '../views/user/TicketInfoView'
import AddTicketView from '../views/user/AddTicketView'
import EditTravelReiView from "../views/user/EditTravelReiView";
import ManagerView from "../views/manager/ManagerView"
import ManagerIndexView from "../views/manager/ManagerIndexView"
import ManagerApprovalView from "../views/manager/ManagerApprovalView"
import FinanceView from "../views/finance/FinanceView";
import FinanceIndexView from "../views/finance/FinanceIndexView";
import FinanceApprovalView from "../views/finance/FinanceApprovalView";
import LeaderShipView from "../views/leadership/LeaderShipView";
import LeaderShipApprovalView from "../views/leadership/LeaderShipApprovalView";
import CashierView from "../views/cashier/CashierView";
import CashierIndexView from "../views/cashier/CashierIndexView";
import CashierApprovalView from "../views/cashier/CashierApprovalView";
import MViewApprovalView from "../views/manager/MViewApprovalView";
import FViewApprovalView from "../views/finance/FViewApprovalView";
import LSViewApprovalView from "../views/leadership/LSViewApprovalView";
import LeaderShipIndexView from "../views/leadership/LeaderShipIndexView";
import CViewApprovalView from "../views/cashier/CViewApprovalView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/adminhome',
    name: 'AdminHome',
    component:AdminView,
    redirect: "/usermanage",
    children:[
      {
        path: '/usermanage',
        name: 'UserManage',
        component: UserManageView
      },
      {
        path: '/vehiclemanage',
        name: 'VehicleManage',
        component: VehicleManageView
      }
    ]
  },
  {
    path: '/managerhome',
    name: 'ManagerHome',
    component:ManagerView,
    redirect: "/managerindex",
    children:[
      {
        path: '/managerindex',
        name: 'ManageIndex',
        component: ManagerIndexView
      },
      {
        path: '/managerapproval',
        name: 'ManagerApproval',
        component: ManagerApprovalView
      },
      {
        path: '/mviewapprovalview',
        name: 'MViewApproval',
        component: MViewApprovalView
      }
    ]
  },
  {
    path: '/financehome',
    name: 'FinanceHome',
    component:FinanceView,
    redirect: "/financeindex",
    children:[
      {
        path: '/financeindex',
        name: 'FinanceIndex',
        component: FinanceIndexView
      },
      {
        path: '/financeapproval',
        name: 'FinanceApproval',
        component: FinanceApprovalView
      },
      {
        path: '/fviewapprovalview',
        name:'FViewApproval',
        component: FViewApprovalView
      }
    ]
  },
  {
    path: '/leadershiphome',
    name: 'LeaderShipHome',
    component:LeaderShipView,
    redirect: "/leadershipindex",
    children:[
      {
        path: '/leadershipindex',
        name: 'LeaderShipIndex',
        component: LeaderShipIndexView
      },
      {
        path: '/leadershipapproval',
        name: 'LeadershipApproval',
        component: LeaderShipApprovalView
      },
      {
        path: '/lsviewapprovalview',
        name: 'LSViewApproval',
        component: LSViewApprovalView
      }
    ]
  },
  {
    path: '/cashierhome',
    name: 'CashierHome',
    component:CashierView,
    redirect: "/cashierindex",
    children:[
      {
        path: '/cashierindex',
        name: 'CashierIndex',
        component: CashierIndexView
      },
      {
        path: '/cashierapproval',
        name: 'CashierApproval',
        component: CashierApprovalView
      },
      {
        path: '/cviewapprovalview',
        name: 'CViewApproval',
        component: CViewApprovalView
      }
    ]
  },
  {
    path: '/userhome',
    name: 'UserHome',
    component:UserView,
    redirect: "/travelrei",
    children:[
      {
        path: '/usermanage',
        name: 'UserManage',
        component: UserManageView
      },
      {
        path: '/vehiclemanage',
        name: 'VehicleManage',
        component: VehicleManageView
      },
      {
        path: '/travelrei',
        name: 'TravelRei',
        component: TravelReiView
      },{
        path: '/addtravel',
        name: 'AddTravel',
        component: AddTravelReiView
      },
      {
        path: '/edittravel',
        name: 'EditTravel',
        component: EditTravelReiView
      },
      {
        path : '/ticketinfo',
        name: 'TicketInfo',
        component :TicketInfoView
      },
      {
        path : '/addticket',
        name : 'AddTicket',
        component :AddTicketView
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
