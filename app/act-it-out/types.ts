interface Movie {
  titleText: TitleText | null
  primaryImage: PrimaryImage | null
  releaseDate: ReleaseDate | null
}

interface TitleText {
  text: string | null
}

interface PrimaryImage {
  width: number | null
  height: number | null
  url: string
}

interface ReleaseDate {
  day: number | null
  month: number | null
  year: number | null
}