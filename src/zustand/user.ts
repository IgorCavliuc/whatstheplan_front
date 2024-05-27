import create, { StateCreator } from "zustand";

type UserStatus = "available" | "issued";

export type UserType = {
  id?: number;
  name?: string;
  surename?: string;
  status?: UserStatus;
  birthday?: string;
  phone?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  photo?: string;
  wallpaper?: string;
  people_data: {
    followers_count?: number;
    following_count?: number;
    visitor_count?: number;
  };

  contact: {
    phone?: string;
    insta?: string;
    facebook?: string;
    telegram?: string;
    viber?: string;
    whatsapp?: string;
  };
  profession?: {
    label?: string;
    value?: string;
  };
};

export type UserStore = {
  user: UserType | undefined;
  noOfAvailable: number;
  noOfIssued: number;
  addUser: (user: UserType) => void;
  issueUser: () => void;
  returnUser: () => void;
  reset: () => void;
};

const userStore: StateCreator<UserStore> = (set) => ({
  user: undefined,
  noOfAvailable: 0,
  noOfIssued: 0,
  addUser: (user: UserType) =>
    set((state) => ({
      ...state,
      user,
    })),
  issueUser: () =>
    set((state) => {
      if (!state.user) return state; // Проверка, что user существует
      return {
        ...state,
        user: { ...state.user, status: "issued" },
        noOfAvailable: state.noOfAvailable - 1,
        noOfIssued: state.noOfIssued + 1,
      };
    }),
  returnUser: () =>
    set((state) => {
      if (!state.user) return state; // Проверка, что user существует
      return {
        ...state,
        user: { ...state.user, status: "available" },
        noOfAvailable: state.noOfAvailable + 1,
        noOfIssued: state.noOfIssued - 1,
      };
    }),
  reset: () => ({
    user: undefined,
    noOfAvailable: 0,
    noOfIssued: 0,
  }),
});

const useUserStore = create<UserStore>(userStore);

export default useUserStore;
