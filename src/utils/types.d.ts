export interface ProfileEdit {
  photo: boolean
  basic: boolean
  profile: boolean
  folio: boolean
  genrus: boolean
  instruments: boolean
}

export interface ChipData {
  label: string;
}

export interface Portfolio {
  ID: number,
  title: string,
  imageURL: string,
  linkURL: string,
  description: string,
  youtubeID: string,
}

export interface PortfolioState extends Portfolio {
  youtubeURL: string,
  isChanged: boolean
}

interface FolioSingleState {
  portfolio: Portfolio
}
