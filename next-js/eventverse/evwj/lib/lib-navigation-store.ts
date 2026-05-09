import { create } from "zustand";
import { persist } from "zustand/middleware";

type NavigationStoreType = {
	dashboardTab?: string | null;
	setDashboardTab: (text?: string | null) => void;
	dashboardHostingTab?: string | null;
	setDashboardHostingTab: (text?: string | null) => void;
	rsvpTab?: string | null;
	setRsvpTab: (text?: string | null) => void;
	rsvpFormTab?: string | null;
	setRsvpFormTab: (text?: string | null) => void;
	rsvpFormFieldLibraryTab?: string | null;
	setRsvpFormFieldLibraryTab: (text?: string | null) => void;
	rsvpSettingTab?: string | null;
	setRsvpSettingTab: (text?: string | null) => void;
	scheduleTab?: string | null;
	setScheduleTab: (text?: string | null) => void;
	scheduleConferenceTab?: string | null;
	setScheduleConferenceTab: (text?: string | null) => void;
	seatingArrangementTab?: string | null;
	setSeatingArrangementTab: (text?: string | null) => void;
	mediaCenterTab?: string | null;
	setMediaCenterTab: (text?: string | null) => void;
	gamesActivitiesTab?: string | null;
	setGamesActivitiesTab: (text?: string | null) => void;
	budgetTab?: string | null;
	setBudgetTab: (text?: string | null) => void;
	budgetSettingTab?: string | null;
	setBudgetSettingTab: (text?: string | null) => void;
	settingsTab?: string | null;
	setSettingsTab: (text?: string | null) => void;
};

export const useNavigationStore = create<NavigationStoreType>()(
	persist(
		(set) => ({
			//
			dashboardTab: null,
			setDashboardTab: (text) =>
				set({
					dashboardTab: text,
				}),
			//
			dashboardHostingTab: null,
			setDashboardHostingTab: (text) =>
				set({
					dashboardHostingTab: text,
				}),
			//
			rsvpTab: null,
			setRsvpTab: (text) =>
				set({
					rsvpTab: text,
				}),
			//
			rsvpFormTab: null,
			setRsvpFormTab: (text) =>
				set({
					rsvpFormTab: text,
				}),
			//
			rsvpFormFieldLibraryTab: null,
			setRsvpFormFieldLibraryTab: (text) =>
				set({
					rsvpFormFieldLibraryTab: text,
				}),
			//
			rsvpSettingTab: null,
			setRsvpSettingTab: (text) =>
				set({
					rsvpSettingTab: text,
				}),
			//
			scheduleTab: null,
			setScheduleTab: (text) =>
				set({
					scheduleTab: text,
				}),
			//
			scheduleConferenceTab: null,
			setScheduleConferenceTab: (text) =>
				set({
					scheduleConferenceTab: text,
				}),
			//
			seatingArrangementTab: null,
			setSeatingArrangementTab: (text) =>
				set({
					seatingArrangementTab: text,
				}),
			//
			mediaCenterTab: null,
			setMediaCenterTab: (text) =>
				set({
					mediaCenterTab: text,
				}),
			//
			gamesActivitiesTab: null,
			setGamesActivitiesTab: (text) =>
				set({
					gamesActivitiesTab: text,
				}),
			//
			budgetTab: null,
			setBudgetTab: (text) =>
				set({
					budgetTab: text,
				}),
			//
			budgetSettingTab: null,
			setBudgetSettingTab: (text) =>
				set({
					budgetSettingTab: text,
				}),
			//
			settingsTab: null,
			setSettingsTab: (text) =>
				set({
					settingsTab: text,
				}),
			//
		}),
		{ name: "navigation-store" },
	),
);
