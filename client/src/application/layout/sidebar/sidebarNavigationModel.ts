import {history} from "../../../index";

export const sidebarNavigationModel =  [
    {
        label: 'Home',
        icon: "pi pi-home",
        command: () => history.push("/")
        
    },
    {
        label: 'Trending Games',
        icon: "pi pi-star-o"
        
    },
    {
      label: "Your History",
      icon: "fas fa-history",
      command: () => history.push("/history")  
    },
    
];