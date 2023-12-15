class ValidationError extends Error {}

class NotFoundError extends Error {}

function handleError(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).render("error", {
      message: `Element was not found`,
    });
  }
  console.error(err);

  res.status(err instanceof ValidationError ? 400 : 500);

  res.render("error", {
    message:
      err instanceof ValidationError
        ? err.message
        : "Something went wrong. Try again later.",
  });
}

module.exports = {
  handleError,
  ValidationError,
  NotFoundError,
};
