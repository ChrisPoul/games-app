interface Movie {
  titleText: TitleText
  primaryImage: PrimaryImage
  releaseDate: ReleaseDate
}

interface TitleText {
  text: string
}

interface PrimaryImage {
  width: number
  height: number
  url: string
}

interface ReleaseDate {
  day: number
  month: number
  year: number
}