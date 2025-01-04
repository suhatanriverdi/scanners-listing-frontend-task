// This file contains type definitions for our data,
// Describing the shape of the data, and what data type each property should accept.

// TODO, will be used while fetching?
export type ScannerData = {
  event: object;
  value: {
    data: Scanner[];
  };
};

export type Scanner = {
  name: string;
  description: string;
  severity: string;
};

export type ScannerRaw = {
  name: string;
  result_img: string | null;
  if_api_support: boolean;
  created_at: string;
  auto_desc: string;
  protocol_id: number | null;
  score: number;
  mini_desc: string;
  user_id: string | null;
  meta_title: string;
  asset_type: string;
  slug: string;
  estimate_time: number;
};
