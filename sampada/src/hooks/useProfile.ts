import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "@/services/httpClient";

export interface ProfileDetailsResponse {
  name: string;
  email: string;
  avatarUrl: string | null;
  timezone: string | null;
  currency: string | null;
  isFirstTimeLogin?: boolean;
}

export interface ProfileSetupInput {
  displayName: string;
  timezone: string;
  currency: string;
}

export const PROFILE_QUERY_KEY = ["profile"] as const;

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async ({ signal }) => {
      const res = await httpClient.get<ProfileDetailsResponse>("/profile", {
        signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    retry: false,
  });
}

export function useSetupProfile() {
  return useMutation({
    mutationFn: async ({ displayName, timezone, currency }: ProfileSetupInput) => {
      try {
        await httpClient.post(
          "/profile",
          { displayName, timezone, currency },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } catch (error) {
        if (
          !axios.isAxiosError(error) ||
          !error.response ||
          (error.response.status !== 404 && error.response.status !== 405)
        ) {
          throw error;
        }
      }
    },
  });
}
