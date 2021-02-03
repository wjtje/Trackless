# Bugs

* A something went wrong banner is shown when you are not singed in

# Search bar

* Don't search when the input has less that two chars (for preformance reasons)

# pages/_app.tx

* should use a onErrorRetry to make sure the app recovers from a broken state (https://swr.vercel.app/docs/error-handling)