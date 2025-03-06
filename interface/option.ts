interface MeetingPoint {
  id: number;
  name: string;
  address: string;
}

interface DropOff {
  id: number;
  name: string;
  location: string;
}

interface HostLanguage {
  id: number;
  language: string;
  proficiency: string;
}

interface AudioGuideLanguage {
  id: number;
  language: string;
  available: boolean;
}

interface BookletLanguage {
  id: number;
  language: string;
  available: boolean;
}

interface IOption {
  id: number;
  name: string;
  description: string;
  meet: MeetingPoint | null;
  drop: DropOff | null;
  host_languages: HostLanguage[];
  audio_guides_languages: AudioGuideLanguage[];
  booklet_languages: BookletLanguage[];
  price: number;
  duration: string;
}







// -------------------

interface LocationDetails {
  address: string;
  landmark: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface Language {
  keyword: string;
}

interface Option {
  id: number;
  meet: LocationDetails;
  drop: LocationDetails;
  host_languages: Language[];
  audio_guides_languages: string[];
  booklet_languages: string[];
  name: string;
  reference_code: string;
  maximum_group_size: number;
  is_wheelchair_accessible: boolean;
  skip_the_line: boolean;
  valid_for: number;
  has_fixed_time: boolean;
  audio_guide: boolean;
  booklet: boolean;
  is_private: boolean;
  drop_off_type: string;
  meeting_point_type: string;
}
