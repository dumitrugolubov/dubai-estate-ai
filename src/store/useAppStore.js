import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
  user: null,
  subscription: {
    status: 'none',
    plan: null,
    currentPeriodEnd: null
  },
  isLoading: false,
  projects: [],
  currentProject: null,
  connectedChannels: [],
  language: 'ru',
  notifications: [],

  setUser: (user) => set({ user }),

  setSubscription: (subscription) => set({
    subscription: {
      status: subscription.status,
      plan: subscription.plan,
      currentPeriodEnd: subscription.currentPeriodEnd
    }
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setProjects: (projects) => set({ projects }),

  addProject: (project) => set((state) => ({
    projects: [project, ...state.projects]
  })),

  setCurrentProject: (project) => set({ currentProject: project }),

  updateProject: (projectId, updates) => set((state) => ({
    projects: state.projects.map(p =>
      p.id === projectId ? { ...p, ...updates } : p
    ),
    currentProject: state.currentProject?.id === projectId
      ? { ...state.currentProject, ...updates }
      : state.currentProject
  })),

  setConnectedChannels: (channels) => set({ connectedChannels: channels }),

  addChannel: (channel) => set((state) => ({
    connectedChannels: [...state.connectedChannels, channel]
  })),

  removeChannel: (channelId) => set((state) => ({
    connectedChannels: state.connectedChannels.filter(c => c.id !== channelId)
  })),

  setLanguage: (language) => set({ language }),

  isSubscribed: () => get().subscription.status === 'active'
}))
