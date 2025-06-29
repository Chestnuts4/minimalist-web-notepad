FROM golang:alpine as builder
WORKDIR /go/src/fghwett/notepad
COPY . .
RUN go get -d -v ./...
RUN go env -w GO111MODULE=on
RUN CGO_ENABLED=0 go build -o notepad ./

FROM scratch
MAINTAINER fghwett fghwett@qq.com
WORKDIR /app
COPY --from=builder /go/src/fghwett/notepad/notepad /app/notepad
VOLUME /app/_tmp
EXPOSE 9099
ENTRYPOINT ["/app/notepad"]