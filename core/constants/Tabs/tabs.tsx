import Shop from "../../../assets/icons/shop.svg";
import Fav from "../../../assets/icons/fav.svg";
import Cart from "../../../assets/icons/cart.svg";
import Search from "../../../assets/icons/search.svg";
import Profile from "../../../assets/icons/profile.svg";
import { Colors } from "../Colors";


export const NAV_TABS: {
  name: string;
  Icon: React.FC;
  options: Record<string, any>;
}[] = [
  {
    name: "index",
    Icon: Shop,
    options: {
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Shop
          fill={focused ? Colors.tab_icons.active : Colors.tab_icons.inActive}
          width={20}
          height={20}
        />
      ),
    },
  },
  {
    name: "favorites",
    Icon: Fav,
    options: {
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Fav
          fill={focused ? Colors.tab_icons.active : Colors.tab_icons.inActive}
          width={20}
          height={20}
        />
      ),
    },
  },
  {
    name: "cart",
    Icon: Cart,
    options: {
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Cart
          fill={focused ? Colors.tab_icons.active : Colors.tab_icons.inActive}
          width={20}
          height={20}
        />
      ),
    },
  },
  {
    name: "search",
    Icon: Search,
    options: {
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Search
          fill={focused ? Colors.tab_icons.active : Colors.tab_icons.inActive}
          width={20}
          height={20}
        />
      ),
    },
  },
  {
    name: "profile",
    Icon: Profile,
    options: {
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Profile
          fill={focused ? Colors.tab_icons.active : Colors.tab_icons.inActive}
          width={20}
          height={20}
        />
      ),
    },
  },
];
