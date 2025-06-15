import { create } from 'zustand';

type Profile = {
    id: string;
    name: string;
    email: string;
    bookings: string[];
};

type ProfileState = {
    profile: Profile | null;
    setProfile: (profile: Profile) => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
}));
