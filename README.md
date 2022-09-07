# AskGov2

Answers from the Singapore Government (v2)

## Tools 

* Needed to run in development:
  * [git](https://git-scm.com/download/mac)
    * [OneFlow](https://www.endoflineblog.com/implementing-oneflow-on-github-bitbucket-and-gitlab) branching model
  * [nvm](https://github.com/nvm-sh/nvm) (should install the correct version of nodejs)
  * [docker](https://docs.docker.com/desktop/mac/install/)
* Used in backend development:
  * [nestjs](https://docs.nestjs.com/)
  * [prisma](https://www.prisma.io/) (postgres)
  * [sgID](https://docs.id.gov.sg/)
  * [postmark](https://postmarkapp.com/)
* Used in frontend development:
  * [react](https://reactjs.org/)
  * [create-react-app](https://create-react-app.dev/)
  * [AskGov Design System v2](https://www.figma.com/file/yATTXTZ5Goy9XDy5qooSO3/AskGov-Design-System-v2?node-id=2153%3A128)
  * [chakra-ui](https://chakra-ui.com/)
  * [storybook](https://storybook.js.org/)
  * [react-query](https://tanstack.com/)
  * [wretch](https://elbywan.github.io/wretch)
  * legacy tools (trying to get rid of these, but you'll notice them)
    * [sass](https://sass-lang.com/)
    * [Ant Design](https://ant.design)

## Getting Started

### Initial start up
* In both the frontend and backend directories, make a copy of `.env.example` and name it `.env`. You will need to fill in a few blanks with items from the vault.

* Install and audit node dependencies

    ```
    npm install
    
    npm run audit-dep
    ```

* Spin up docker containers (this will create the `askgov_dev` database):

  ```
  docker-compose up
  ```

* Create tables in database:

  ```
  npm run db:deploy
  ```

* Seed the database with a sample dataset:

  ```
  npm run db:seed
  ```

* Stop docker compose (`npm run dev` will spin it up again):

   ```
   docker-compose stop
   ```

### During Development

* Start running frontend, backend, maildev, localstack and mysql simultaneously (requires Docker)

  ```
  npm run dev
  ```

  Alternatively, to run individually:

  ```
  # for supporting services
  docker-compose up

  # for backend only
  npm run backend

  # for frontend only
  npm run frontend
  ```

  Frontend server accessible on `localhost:3000`

  Backend server accessible on `localhost:6174/api/v1`

* To generate a new database migration and prisma client from changes to prisma.schema:

  ```
  cd backend
  npm run db:dev
  ```

* To reset the database, run all migrations, and seed the database:

  ```
  cd backend
  npm run db:reset
  ```

* To view UI components on storybook (accessible on `localhost:6006`): `npm run storybook`

## Concepts

### Workflow

This redesign of AskGov assumes the following workflow:
1. Members of the public begin looking for answers to their questions by searching Google or AskGov.
2. If they find their question on AskGov, they can give feedback on it (e.g. by voting). If they don't find their question on AskGov, then can pose a new question. Sign in with sgID is required to vote or ask questions.
3. New questions are screened by officers to remove inappropriate content. When approved, a question becomes visible.
4. Approved questions and their rankings are answered by officers. 

The workflow in version 1 of AskGov was different in some key ways:
* It required public users to choose a topic for their question from a list of possibilities.
* It did not require public users to sign in before asking questions.
* Officers were free to modify questions before publishing them.
* It made questions visible only when they were answered (so screening was not necessary).
* It had no voting.

### User Types
Thre are two user types: Public and Officer. Public users sign in with sgID (SingPass) and Officer login with email OTP.

Public users are currently anonymous and identified only by an anonymized openid in the User table. We have registered with sgID to collect name and nric, but we are not currently using these. During sign-in we request permission to view the user's name, but this is only because of a bug in @opengovsg/sgid-client that throws an exception if we request nothing but openid.

Officers are currently stored in the Officer table, but this table should be merged into the User table. This complicates the User table, but merging the two makes permissions more flexible. For example, it would be easy to allow officers to ask questions or allow public users to answer them. The user interface is also simpler if we allow only one type of login at a time.

Currently, any officer with an email address ending with gov.sg can log in, but this should be changed to allow login only by officers who already exist in the table.

### Permissions
* Only public users can ask questions. This is a consequence of the fact that the User and Officer tables are separate (it isn't intentional).
* Only public users can vote. This ensures that each member of the public can vote exactly once, since officers are likely to be members of the public.
* Other permissions are controlled by adding a row to the permission table:
  * SCREEN permission allows someone to screen questions.
  * ANSWER permission allows someone to answer questions.

### Voting

Voting is an easy way for public users to give feedback on questions and answers. Votes on questions can reveal which questions are most important to answer, and votes on answers can reveal which ones are most helpful.

The system supports both upvotes and downvotes for both questions and answers. The interface currently supports upvotes only.

### Screening

The screening interface is simple. Users with screening permission can assign a ScreenState to each question: NEW, APPROVED, or REJECTED. This leaves open some big questions, including:
* How should screeners route questions to the officers who answer them?
* What feedback should be given to public users if their question is rejected? (Good feedback builds trust.)

### Answers

The system supports any number of answers to a question, but it's likely that this will need to change. Most officers prefer to give only one official answer to a public question to avoid confusion. One possibility would be to allow government officials to discuss and vote on answers before choosing one to make public. 

### Tags

Questions can have any number of tags. Tags are a flexible mechanism that could be used in a variety of ways to put questions in context. To focus the AskGov interface on a tag, add its "slug" to the URL query (e.g. `https://v2.ask.gov.sg?tag=working-at-ogp` or `https://v2.ask.gov.sg?tag=ogp&tag=internal`). The available set of tags is controlled by the Tag table. Currently, only AskGov administrators can add or modify tags. 

Tags are evolving as we gain a deeper understanding of public and officer needs. Here are some ways that they could be used:
 * Define a tag for an event, and direct attendees to an AskGov url that includes that tag. New questions will automatically include the tag. We used tags in this way at the NUS career fair in 2022.
 * Give screening officers a way to add tags to questions, and give answering officers a way to indicate which tags are interesting to them. This would create an easy way to route questions to people who are likely to answer them.
 * Allow public users to add tags to increase a question's visibility.
 * Browse through questions by tag.
 * Notify users of new questions or newly answered questions with a given tag.
 * Break down questions by tag in question analytics reports.

Tags currently have an important limitation: When a question has multiple tags, it's not clear how to present them. How we solve this problem will depend on how the use of tags evolves. Here are a few possibilities:

1. Allow focusing on at most one tag at a time. (Putting multiple tags in the query string would be an error in this case.) This would work well if tags are used as topics. For example, a question may be related to both `Manpower` and `Finance`, but any given officer is likely to be intrested in only one of these.
2. Allow focusing on multiple tags, but define some ordering to make the interface clear and consistent.

   1. If tags are matched with search keywords, then the presentation of tags could be based on a user's search (e.g. `covid`, `vaccine`, `appointments`).
   2. If tags are used to provide some hierarchical structuring for all questions, then tags could be given a priority that defines their ordering (e.g. `MOE`, `Internal`, `Benefits`). 

## Roadmap
* Backend: Merge officer table into user table and make two users types: PUBLIC and OFFICER. Add an agency field for officers.
  * Consider adding Postgres Check constraints to ensure that each user type includes the necessary fields (see [stack-overflow](https://stackoverflow.com/questions/10273750/sql-conditional-not-null-constraint) and [prisma docs](https://www.prisma.io/docs/guides/database/advanced-database-tasks/data-validation/postgresql)) 
* Backend: Clean up QuestionController.
* Allow officer login only for whitelisted officers
* Frontend: Use updated text for Privacy and Terms components. 
* Frontend: Finish move from ant.design to chakra-ui components
* Frontend: Build a ScrollToTop widget (see index.tsx 
* Add unit tests and e2e tests.
* Use zod to generate DTOs from prisma schema and put in a shared folder
  * Requires putting prisma files in shared folder. Make sure the Prisma client doesn't get into the frontend.
  * Requires react-app-rewired (or craco, if it starts to support CRA 5)
* Set up GitHub actions to perform database migrations and send storybook to Chromatic
* Backend: Add full-text search (see [prisma docs](https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search))
* Frontend: Add Google Analytics
* Set up Dependabot
* Add maker-checker repository controls
* Add husky pre-commit lint and secrets checks
* Frontend: Convert remaining SASS styles to Chakra and remove sass dependency.
  * components/RichText
* Security improvements:
  * Add [helmet](https://docs.nestjs.com/security/helmet#helmet) to the backend.
  * Improve security of OTPs by using HMAC-based OTPs (HOTPs) instead of time-based OTPs (TOTPs) and limit the number of retries.
